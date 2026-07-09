import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, fullWidth, id, ...props }, ref) => {
    return (
      <div className={cn('form-group', fullWidth && 'form-group--full-width')}>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <div className="form-select-wrapper">
          <select
            ref={ref}
            id={id}
            className={cn('form-select', error && 'form-select--error', className)}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <span className="form-select-icon">▾</span>
        </div>
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
