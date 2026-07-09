import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, fullWidth, id, ...props }, ref) => {
    return (
      <div className={cn('form-group', fullWidth && 'form-group--full-width')}>
        {label && (
          <label htmlFor={id} className="form-label">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn('form-input', error && 'form-input--error', className)}
          {...props}
        />
        {error && <span className="form-error">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
