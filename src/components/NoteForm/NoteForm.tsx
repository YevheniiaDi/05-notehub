import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import type { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  onCreated: () => void; // ✅ додано
}

const tagOptions: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

type FormValues = {
  title: string;
  content: string;
  tag: NoteTag;
};

const NoteForm: React.FC<NoteFormProps> = ({ onClose, onCreated }) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (values: FormValues) => createNote(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      onCreated(); // ✅ тепер викликається
      onClose();
    },
    onError: (error) => {
      console.error('Error creating note:', error);
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Title is required'),
      content: Yup.string().max(500, 'Maximum 500 characters'),
      tag: Yup.mixed<NoteTag>().oneOf(tagOptions).required('Tag is required'),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  const renderError = (field: keyof FormValues) =>
    formik.touched[field] && formik.errors[field] ? (
      <div className={css.error}>{formik.errors[field]}</div>
    ) : null;

  return (
    <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
      {/* Title */}
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          required
          className={css.input}
          {...formik.getFieldProps('title')}
          aria-invalid={!!formik.errors.title}
        />
        {renderError('title')}
      </div>

      {/* Content */}
      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows={6}
          className={css.textarea}
          {...formik.getFieldProps('content')}
          aria-invalid={!!formik.errors.content}
        />
        {renderError('content')}
      </div>

      {/* Tag */}
      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          className={css.select}
          {...formik.getFieldProps('tag')}
          aria-invalid={!!formik.errors.tag}
          required
        >
          {tagOptions.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {renderError('tag')}
      </div>

      {/* Actions */}
      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;