import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import NoteModal from '../NoteModal/NoteModal';
import useDebounce from '../../hooks/useDebounce';
import type { Note } from '../../types/note';
import css from './App.module.css';

const PER_PAGE = 12;

type NoteResponse = {
  results: Note[];
  total: number;
  totalPages: number;
};

const App: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);

  const debouncedSearch = useDebounce(search, 500);

  const { data, isLoading, isError, refetch } = useQuery<NoteResponse>(
    ['notes', page, debouncedSearch],
    () => fetchNotes(debouncedSearch, page),
    { keepPreviousData: true }
  );

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.button} onClick={openModal}>
          Create Note
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes</p>}

      {data?.results?.length ? (
        <>
          <NoteList notes={data.results} />
          {data.total > PER_PAGE && (
            <Pagination
              pageCount={Math.ceil(data.total / PER_PAGE)}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      ) : (
        !isLoading && <p>No notes found.</p>
      )}

      {isModalOpen && <NoteModal onClose={closeModal} onCreated={refetch} />}
    </div>
  );
};

export default App;
