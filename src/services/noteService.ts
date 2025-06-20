import axiosInstance from './axiosInstance';
import type { Note, NoteTag } from '../types/note';

const BASE_URL = '/notes';

interface RawNote {
  _id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

function transformNote(raw: RawNote): Note {
  return {
    id: parseInt(raw._id, 10),
    title: raw.title,
    content: raw.content,
    tag: raw.tag,
  };
}

export const fetchNotes = async (
  search: string,
  page: number,
  perPage: number // ✅ Параметр perPage замість limit
): Promise<{ results: Note[]; total: number; totalPages: number }> => {
  const response = await axiosInstance.get<{
    results: RawNote[];
    total: number;
    totalPages: number;
  }>(BASE_URL, {
    params: {
      search,
      page,
      perPage, // ✅ ВАЖЛИВО: саме perPage
    },
  });

  return {
    results: response.data.results.map(transformNote),
    total: response.data.total,
    totalPages: response.data.totalPages,
  };
};

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await axiosInstance.post<RawNote>(BASE_URL, noteData);
  return transformNote(response.data);
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axiosInstance.delete<RawNote>(`${BASE_URL}/${id}`);
  return transformNote(response.data);
};
