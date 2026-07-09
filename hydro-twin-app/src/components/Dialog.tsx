import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg';
}

export function Dialog({ isOpen, onClose, title, children, footer, maxWidth = 'md' }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogNode = dialogRef.current;
    if (isOpen) {
      dialogNode?.showModal();
    } else {
      dialogNode?.close();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="dialog-overlay" onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <dialog
        ref={dialogRef}
        className={cn('dialog', `dialog--${maxWidth}`)}
        onCancel={onClose}
      >
        <div className="dialog-header">
          <h2 className="dialog-title">{title}</h2>
          <button className="dialog-close" onClick={onClose} aria-label="Tutup">
            ✕
          </button>
        </div>
        <div className="dialog-content">{children}</div>
        {footer && <div className="dialog-footer">{footer}</div>}
      </dialog>
    </div>,
    document.body
  );
}
