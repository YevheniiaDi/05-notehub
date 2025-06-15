import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createNote } from '../../services/noteService';
import { NoteTag } from '../../types/note';
import css from './NoteForm.module.css';

interface NoteFormProps {
  onClose: () => void;
  onCreated: () => void;
}

const tagOptions: NoteTag[] = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

const NoteForm: React.FC<NoteFormProps> = ({ onClose, onCreated }) => {
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      tag: 'Todo' as NoteTag,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .min(3, 'Minimum 3 characters')
        .max(50, 'Maximum 50 characters')
        .required('Title is required'),
      content: Yup.string()
        .max(500, 'Maximum 500 characters'),
      tag: Yup.mixed<NoteTag>()
        .oneOf(tagOptions, 'Invalid tag')
        .required('Tag is required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createNote(values.title, values.content, values.tag);
        onCreated();
        resetForm();
        onClose();
      } catch (error) {
        console.error('Error creating note:', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className={css.input}
          {...formik.getFieldProps('title')}
        />
        {formik.touched.title && formik.errors.title && (
          <div className={css.error}>{formik.errors.title}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          rows={6}
          className={css.textarea}
          {...formik.getFieldProps('content')}
        />
        {formik.touched.content && formik.errors.content && (
          <div className={css.error}>{formik.errors.content}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="tag">Tag</label>
        <select
          id="tag"
          name="tag"
          className={css.select}
          {...formik.getFieldProps('tag')}
        >
          {tagOptions.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {formik.touched.tag && formik.errors.tag && (
          <div className={css.error}>{formik.errors.tag}</div>
        )}
      </div>

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
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Creating...' : 'Create note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;