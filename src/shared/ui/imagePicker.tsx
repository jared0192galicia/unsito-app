import cn from '@/utils/cn';
import { useRef, useState } from 'react';

interface ImagePickerProps {
  onChange?: (src: string) => void;
}

export default function ImagePicker({ onChange }: ImagePickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('Seleccionar imagen');
  const [imageSrc, setImageSrc] = useState<string>('');

  function handleClick() {
    inputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImageSrc(base64);
      onChange?.(base64);
    };

    reader.readAsDataURL(file);
  }

  return (
    <div className="w-full space-y-3">
      {/* Input fake */}
      <div
        className="
          flex items-center justify-between
          rounded-lg border border-blue-400
          px-4 py-3
          cursor-pointer
          hover:border-blue-500
          transition
        "
        onClick={handleClick}
      >
        <span className="text-sm text-gray-600 truncate">{fileName}</span>

        <button
          type="button"
          className={cn(
            'text-sm font-medium text-blue-600 hover:text-blue-700', 'hover:underline cursor-pointer'
          )}
        >
          Examinar
        </button>
      </div>

      {/* Input real oculto */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Preview */}
      {/* {imageSrc && (
        <div className="space-y-2">
          <img
            src={imageSrc}
            alt="Preview"
            className="max-w-xs rounded-lg border"
          />
        </div>
      )} */}
    </div>
  );
}
