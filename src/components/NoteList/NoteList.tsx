import React from 'react';
import { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '../../services/noteService';

interface NoteListProps {
  notes: Note[];
  onDelete: () => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onDelete }) => {
  const handleDelete = async (id: string) => {
    await deleteNote(id);
    onDelete();
  };

  return (
    <ul className={css.list}>
      {notes.map(({ _id, title, content, tag }) => (
        <li key={_id} className={css.listItem}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.content}>{content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{tag}</span>
            <button className={css.button} onClick={() => handleDelete(_id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;
