import axios from 'axios';
import { Note, NoteTag } from '../types/note';

const BASE_URL = '/api/notes';

interface RawNote {
  _id: string;
  title: string;
  content: string;
  tag: NoteTag;
}

function transformNote(raw: RawNote): Note {
  return {
    id: Number(raw._id),
    title: raw.title,
    content: raw.content,
    tag: raw.tag,
  };
}

// Додати токен
const token = localStorage.getItem('token');

const authHeaders = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export const fetchNotes = async (
  search: string,
  page: number
): Promise<{ results: Note[]; total: number; totalPages: number }> => {
  const response = await axios.get<{
    results: RawNote[];
    total: number;
    totalPages: number;
  }>(BASE_URL, {
    params: { search, page },
    ...authHeaders,
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
  const response = await axios.post<RawNote>(BASE_URL, noteData, authHeaders);
  return transformNote(response.data);
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await axios.delete<RawNote>(`${BASE_URL}/${id}`, authHeaders);
  return transformNote(response.data);
};