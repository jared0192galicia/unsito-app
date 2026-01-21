// import { HoliDay, useCalendarStorage } from '@src/context/preslowCalendarStore';
// import { UIMessages } from '@src/models/messages';
// import api from '@src/services/magicFetch';
import { HoliDay, useCalendarStorage } from '@/context/preslowCalendarStore';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { useState } from 'react';
import FormCheckbox from './checkbox';

interface Props {
  visible: boolean;
  date: string;
  onHide: () => void;
  // show: (message: any) => void;
  // form: any;
  // onChange: (key: keyof HoliDay, value: string) => void;
  // setForm: (form: any) => void;
  // onClear: () => void;
}

export function EditDayDialog({
  visible,
  onHide,
  date
  // form,
  // onChange,
  // onClear,
  // show,
}: Props) {
  const [form, setForm] = useState<any>({});
  const { holidays, setHolidays } = useCalendarStorage();

  const onChange = (key: string, value: string | boolean) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  const buildBody = () => {
    return {
      nombre: form.name,
      descripcion: form.description,
      colorFondo: form.backgroundColor,
      colorFondoDialogo: form.backgroundColorDialog,
      colorTexto: form.textColor
    };
  };

  const onSave = async () => {
    console.log(`Cambiar ==> ${date} from \n`, holidays.length);

    const edited: HoliDay | undefined = holidays.find(
      (day) => day.date == date
    );
    console.log('🚀 ~ edited:', edited);
    const aux = holidays.filter((day) => day.date != date);
    console.log('🚀 ~ aux:', aux);

    if (edited) {
      edited.description = form.description;
      edited.isDashed = form.isDashed;

      setHolidays([...aux, edited]);
    }
    // mode == 'CREATE' ? await postTypeHoliDay() : await putTypeHoliDay();
    onHide();
  };

  const footer = (
    <div className='flex gap-2'>
      <Button
        label='Guardar'
        icon='pi pi-save'
        severity='success'
        size='small'
        onClick={onSave}
        outlined
      />
      <Button
        label='Cancelar'
        icon='pi pi-eraser'
        severity='warning'
        size='small'
        // onClick={onClear}
        outlined
      />
    </div>
  );

  return (
    <Dialog
      header='Ajustar dia'
      visible={visible}
      style={{ width: '300px' }}
      onHide={onHide}
      footer={footer}
    >
      <section className='flex flex-col gap-6 p-4'>
        <span className='p-float-label mt-1'>
          <InputText
            id='name'
            value={form.description || ''}
            onChange={(e) => onChange('description', e.target.value)}
            className='w-full'
          />
          <label htmlFor='name'>Descripción</label>
        </span>
        <FormCheckbox
          label='Con fondo rayado'
          name='isDashed'
          handler={onChange}
          value={form.isDashed}
          className='w-fit flex-row-reverse gap-2'
        ></FormCheckbox>
      </section>
    </Dialog>
  );
}
