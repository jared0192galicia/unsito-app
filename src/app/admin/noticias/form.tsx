'use client';

import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { useNotificationStore } from '@/context/useNotificationStore';
import { FileBox, Save, Trash2, Sparkles, X } from 'lucide-react';
import { ControlButton } from '@/shared/ui/button';
import ImagePicker from '@/shared/ui/imagePicker';
import { Nullable } from 'primereact/ts-helpers';
import { SiGooglegemini } from 'react-icons/si';
import { Calendar } from 'primereact/calendar';
import Button from '@/shared/ui/adminButton';
import { useEffect, useState, useCallback } from 'react';
import { CgClose } from 'react-icons/cg';
import api from '@/services/magicFetch';
import { AxiosResponse } from 'axios';
import Input from '@/shared/ui/input';
import dynamic from 'next/dynamic';
import cn from '@/utils/cn';

const Editor = dynamic(
  () => import('primereact/editor').then((mod) => mod.Editor),
  { ssr: false },
);

// --- INTERFACES ---
interface Tag {
  id: number;
  name: string;
}

interface FormProps {
  close: () => void;
  data?: any;
  mode: 'Edit' | 'Create';
}

interface NewNote {
  title: string;
  content: string;
  description: string;
  dateRange: Nullable<(Date | null)[]>;
  tags: Tag[]; // Siempre objetos para mantener consistencia
  banner: string;
}

export default function FormPage({ close, data, mode }: FormProps) {
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [form, setForm] = useState<NewNote>({
    title: '',
    content: '',
    description: '',
    dateRange: null,
    tags: [],
    banner: '',
  });

  const pushNotification = useNotificationStore((s) => s.push);

  const [reviewResult, setReviewResult] = useState<any | null>(null);
  const [suggestResult, setSuggestResult] = useState<any | null>(null);
  const [panelOpen, setPanelOpen] = useState<'review' | 'suggest' | null>(null);
  const [loadingReview, setLoadingReview] = useState(false);
  const [loadingSuggest, setLoadingSuggest] = useState(false);

  // --- LOGICA DE CARGA ---
  const fetchOptions = useCallback(async () => {
    try {
      const response: AxiosResponse = await api.site.getTags();
      setTagOptions(response.data);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }, []);

  useEffect(() => {
    fetchOptions();
  }, [fetchOptions]);

  useEffect(() => {
    if (data && mode === 'Edit') {
      setForm({
        title: data.title || '',
        content: data.content || '',
        description: data.description || '',
        dateRange: data.eventDateStart
          ? [new Date(data.eventDateStart), new Date(data.eventDateEnd)]
          : null,
        tags: data.tags || [],
        banner: data.banner || '',
      });
    }
  }, [data, mode]);

  const handleChange = (name: string, value: any) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleDiscard = () => {
    if (confirm('¿Seguro que deseas descartar los cambios?')) close();
  };

  const makeGeminiBody = () => ({
    title: form.title,
    content: form.content,
    description: form.description,
    tags: form.tags.map((t) => t.name),
    date: form.dateRange?.map((d) => d?.toISOString()).join(' - ') || '',
  });

  const parseGeminiResponse = (rawData: any) => {
    let text = rawData?.result ?? rawData?.text ?? rawData;
    if (typeof text !== 'string') return text;
    text = text
      .trim()
      .replace(/^```json\n?/, '')
      .replace(/\n?```$/, '')
      .trim();
    try {
      return JSON.parse(text);
    } catch {
      return { raw: text };
    }
  };

  // --- APLICAR SUGERENCIAS (FIX DE TIPOS) ---
  const applySpellingSuggestion = (err: any) => {
    const { field, suggestion } = err;
    if (!suggestion) return;

    setForm((prev) => {
      if (field === 'tags') return prev; // Las tags se manejan diferente
      return { ...prev, [field === 'tittle' ? 'title' : field]: suggestion };
    });

    pushNotification({
      title: 'Corregido',
      description: `Campo ${field} actualizado`,
      type: 'success',
    });
  };

  const applyGeneralSuggestion = (field: string, value: any) => {
    if (!value) return;

    try {
      if (field === 'dateRange') {
        // El ejemplo suele venir como string de un array JSON
        const dates = typeof value === 'string' ? JSON.parse(value) : value;
        handleChange(
          'dateRange',
          dates.map((d: string) => new Date(d)),
        );
      } else if (field === 'tags') {
        const tagsToSync =
          typeof value === 'string'
            ? JSON.parse(value.replace(/'/g, '"'))
            : value;
        tagsToSync.forEach((t: string) => addRecommendedTag(t));
      } else {
        handleChange(field, value);
      }

      pushNotification({
        title: 'Campo actualizado',
        description: `Se ha aplicado la sugerencia en ${field}`,
        type: 'success',
      });
    } catch (error) {
      console.error('Error aplicando sugerencia:', error);
    }
  };

  const addRecommendedTag = (tagName: string) => {
    setForm((prev) => {
      // Evitar duplicados
      if (prev.tags.some((t) => t.name.toLowerCase() === tagName.toLowerCase()))
        return prev;

      // Buscamos si el tag existe en las opciones de la DB
      const existingTag = tagOptions.find(
        (t) => t.name.toLowerCase() === tagName.toLowerCase(),
      );
      const newTag: Tag = existingTag || { id: Math.random(), name: tagName }; // Fallback si es nuevo

      return { ...prev, tags: [...prev.tags, newTag] };
    });
  };

  // --- HANDLERS API ---
  const handleReview = async () => {
    setLoadingReview(true);
    setPanelOpen('review');
    try {
      const res = await api.admin.postGeminiReview({ body: makeGeminiBody() });
      setReviewResult(parseGeminiResponse(res.data));
    } catch (err) {
      pushNotification({
        title: 'Error',
        description: 'No se pudo revisar',
        type: 'error',
      });
    } finally {
      setLoadingReview(false);
    }
  };

  const handleSuggest = async () => {
    setLoadingSuggest(true);
    setPanelOpen('suggest');
    try {
      const res = await api.admin.postGeminiSuggest({ body: makeGeminiBody() });
      setSuggestResult(parseGeminiResponse(res.data));
    } catch (err) {
      pushNotification({
        title: 'Error',
        description: 'Error en sugerencias',
        type: 'error',
      });
    } finally {
      setLoadingSuggest(false);
    }
  };

  // --- RENDERIZADO DE PANELES (UI MEJORADA) ---
  const renderReviewPanel = () => (
    <div className="flex flex-col gap-4 p-4">
      {reviewResult?.errors?.map((err: any, i: number) => (
        <div
          key={i}
          className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm"
        >
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] uppercase tracking-wider font-bold text-app-blue-600 bg-app-blue-50 px-2 py-1 rounded">
              {err.field}
            </span>
            <button
              onClick={() => applySpellingSuggestion(err)}
              className="text-xs font-semibold text-app-blue-700 hover:underline"
            >
              Aplicar
            </button>
          </div>
          <p className="text-xs text-gray-400 line-through mb-1">
            {err.original}
          </p>
          <p className="text-sm font-medium text-gray-800">{err.suggestion}</p>
        </div>
      ))}
    </div>
  );

  const renderSuggestPanel = () => {
    const seo = suggestResult?.seo ?? { recommended_tags: [] };
    const titles = suggestResult?.title_suggestions ?? [];

    return (
      <div className="flex flex-col gap-6 p-4">
        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">
            Títulos Alternativos
          </h4>
          <div className="flex flex-col gap-2">
            {titles.map((t: any, i: number) => (
              <div
                key={i}
                className="group relative bg-app-blue-50/50 p-3 rounded-lg border border-transparent hover:border-app-blue-200 transition-all cursor-pointer"
                onClick={() => handleChange('title', t.title)}
              >
                <p className="text-sm font-semibold text-app-blue-900">
                  {t.title}
                </p>
                <p className="text-[11px] text-app-blue-700/70 mt-1">{t.why}</p>
                <Sparkles className="absolute top-2 right-2 w-3 h-3 text-app-blue-400 opacity-0 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">
            Tags Recomendados
          </h4>
          <div className="flex flex-wrap gap-2">
            {seo.recommended_tags.map((tg: string, i: number) => (
              <button
                key={i}
                onClick={() => addRecommendedTag(tg)}
                className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:bg-app-blue-600 hover:text-white transition-colors shadow-sm"
              >
                + {tg}
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-hscreen w-screen bg-app-soft-white px-6 py-6">
      <header className="flex justify-between items-center mb-3">
        <div>
          <h1 className="text-3xl font-bold text-app-blue-900">
            {mode === 'Edit' ? 'Editar Noticia' : 'Nueva Publicación'}
          </h1>
          {/* <p className="text-slate-500 text-sm">
            Gestiona el contenido y optimiza con IA
          </p> */}
        </div>
        <button
          onClick={close}
          className="p-2 hover:bg-slate-200 rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-slate-400" />
        </button>
      </header>

      <div className="flex gap-4 mt-6 bg-app-white p-3 my-3 px-2 rounded-lg justify-between">
        <div className="flex gap-4">
          <Button
            variant="discard"
            onClick={handleDiscard}
            className="flex gap-2"
          >
            <Trash2 className="w-4 h-4" /> Descartar
          </Button>
          <Button variant="draft" onClick={() => {}} className="flex gap-2">
            <FileBox className="w-4 h-4" /> Borrador
          </Button>
          <Button
            variant="save"
            onClick={() => {}}
            className="ml-auto flex gap-2"
          >
            <Save className="w-4 h-4" /> Publicar
          </Button>
        </div>
        {/* <div className="h-12 w-[1px] bg-slate-200 mx-2" /> */}
        <div className="flex gap-4">
          <ControlButton
            label={loadingReview ? 'Revisando...' : 'IA Review'}
            type="primary"
            onClick={handleReview}
            icon={
              <SiGooglegemini
                className={cn(loadingReview && 'animate-pulse')}
              />
            }
          />
          <ControlButton
            label={loadingSuggest ? 'Generando...' : 'Sugerencias'}
            type="primary"
            onClick={handleSuggest}
            icon={
              <SiGooglegemini
                className={cn(loadingSuggest && 'animate-pulse')}
              />
            }
          />
        </div>
      </div>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario Izquierda */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-app-white p-6 rounded-lg shadow-sm border border-slate-100 space-y-4">
            <Input
              label="Título de la noticia"
              name="title"
              value={form.title}
              change={handleChange}
              placeholder="Ej: Gran apertura del centro..."
            />
            <Input
              label="Resumen corto (SEO)"
              name="description"
              value={form.description}
              change={handleChange}
            />

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Rango de fechas
              </label>
              <Calendar
                value={form.dateRange}
                onChange={(e) => handleChange('dateRange', e.value)}
                selectionMode="range"
                className="w-full"
                showIcon
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Etiquetas
              </label>
              <MultiSelect
                value={form.tags}
                options={tagOptions}
                onChange={(e) => handleChange('tags', e.value)}
                optionLabel="name"
                placeholder="Seleccionar tags"
                className="w-full"
                display="chip"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">
              Imagen de portada
            </label>
            <ImagePicker onChange={(val) => handleChange('banner', val)} />
          </div>
        </div>

        {/* Editor Derecha */}
        <div className="lg:col-span-2">
          <div className="bg-app-white p-2 rounded-lg shadow-sm border border-slate-100 h-full">
            <Editor
              value={form.content}
              onTextChange={(e) => handleChange('content', e.htmlValue ?? '')}
              style={{ height: '450px' }}
              placeholder="Comienza a escribir la historia..."
            />
          </div>
        </div>
      </main>

      {/* PANEL GEMINI (SIDEBAR) */}
      <aside
        className={cn(
          'fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl z-[100] transition-transform duration-300 transform border-l border-slate-100 flex flex-col',
          panelOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-app-blue-600 rounded-lg text-white">
              <SiGooglegemini />
            </div>
            <div>
              <h2 className="font-bold text-slate-900">
                {panelOpen === 'review'
                  ? 'Revisión Ortográfica'
                  : 'Asistente Editorial'}
              </h2>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                Powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={() => setPanelOpen(null)}
            className="text-slate-400 hover:text-slate-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-[#FDFDFD]">
          {loadingReview || loadingSuggest ? (
            <div className="flex flex-col items-center justify-center h-64 gap-4">
              <div className="w-8 h-8 border-4 border-app-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-500 font-medium">
                Gemini está analizando tu texto...
              </p>
            </div>
          ) : (
            <>
              {panelOpen === 'review' && renderReviewPanel()}
              {panelOpen === 'suggest' && renderSuggestPanel()}
            </>
          )}
        </div>

        <div className="p-4 border-t border-slate-100 bg-white">
          <button
            className="w-full py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors"
            onClick={() => setPanelOpen(null)}
          >
            Entendido
          </button>
        </div>
      </aside>
    </div>
  );
}
