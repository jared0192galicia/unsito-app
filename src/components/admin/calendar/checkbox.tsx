// import cn from '@services/clsx';
// import FormLabel from './label';
import cn from '@/utils/cn';
import { Checkbox, CheckboxChangeEvent } from 'primereact/checkbox';

interface FormCheckboxProps {
  label: string;
  name: string;
  value: boolean;
  invalid?: boolean;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  handler: (name: string, value: boolean | string) => void;
}

export default function FormCheckbox({
  label,
  name,
  handler,
  invalid = false,
  className = '',
  value = false,
  required = false,
  disabled = false
}: FormCheckboxProps) {
  const handleChange = (e: CheckboxChangeEvent) => {
    const checked = e.checked || false;
    handler(name, checked);
  };

  return (
    <div className={cn('flex flex-col items-start justify-between', className)}>
      {/* <FormLabel name={`${label}${required ? '*' : ''}`} /> */}
      <label htmlFor="">{`${label}${required ? '*' : ''}`}</label>
      <Checkbox
        checked={value}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        className={cn('border', { 'border-red-600': invalid })}
      />
    </div>
  );
}