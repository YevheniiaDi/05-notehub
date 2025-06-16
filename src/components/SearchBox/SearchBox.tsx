import React from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange }) => (
  <div className={css.wrapper}>
    <label htmlFor="note-search" className="visually-hidden">
      Search notes
    </label>
    <input
      id="note-search"
      className={css.input}
      type="search"
      placeholder="Search notes"
      value={value}
      onChange={e => onChange(e.target.value)}
      aria-label="Search notes"
    />
  </div>
);

export default SearchBox;