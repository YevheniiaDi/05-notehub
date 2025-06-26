import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import SearchBox from '../SearchBox/SearchBox';
import Pagination from '../Pagination/Pagination';
import NoteList from '../NoteList/NoteList';
import Modal from '../Modal/Modal'; // оновлений імпорт
import NoteForm from '../NoteForm/NoteForm'; // додано
import useDebounce from '../../hooks/useDebounce';
import type { Note } from '../../types/note';
import css from './App.module.css';

const PER_PAGE = 12 as const;

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

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useQuery<NoteResponse, Error>({
    queryKey: ['notes', page, debouncedSearch],
    queryFn: () => fetchNotes(debouncedSearch.trim(), page, PER_PAGE),
    placeholderData: (prev) => prev,
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={setSearch} />
        <button className={css.button} onClick={openModal}>
          Create Note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes</p>}

      {!isLoading && data && data.results.length === 0 && (
        <p>No notes found.</p>
      )}

      {data && data.results.length > 0 && (
        <>
          <NoteList notes={data.results} />
          {data.totalPages > 1 && (
            <Pagination
              pageCount={data.totalPages}
              currentPage={page}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} onCreated={refetch} />
        </Modal>
      )}
    </div>
  );
};

export default App;




