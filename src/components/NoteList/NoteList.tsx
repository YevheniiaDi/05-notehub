import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Note } from '../../types/note';
import { deleteNote } from '../../services/noteService';
import css from './NoteList.module.css';

interface NoteListProps {
  notes: Note[];
}

const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();

  const { mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
  });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => (
        <li key={id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => mutateDelete(id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
