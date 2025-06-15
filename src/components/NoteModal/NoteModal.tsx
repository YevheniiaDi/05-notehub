import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import NoteForm from '../NoteForm/NoteForm';
import css from './NoteModal.module.css';

interface NoteModalProps {
  onClose: () => void;
  onCreated: () => void;
}

const modalRoot = document.getElementById('modal-root')!;

const NoteModal: React.FC<NoteModalProps> = ({ onClose, onCreated }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return ReactDOM.createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        <NoteForm onClose={onClose} onCreated={onCreated} />
      </div>
    </div>,
    modalRoot
  );
};

export default NoteModal;
