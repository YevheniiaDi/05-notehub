import axios from "axios";
import type { Note, NoteTag } from "../types/note";

const api = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

const BASE_URL = "/notes";
const PER_PAGE = 12;

interface RawNote {
  _id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

// ✅ Функція для перетворення
function transformNote(raw: RawNote): Note {
  return {
    id: parseInt(raw._id, 10),
    title: raw.title,
    content: raw.content,
    tag: raw.tag,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
}

export const fetchNotes = async (
  search: string,
  page: number
): Promise<NotesResponse> => {
  const params = {
    page,
    perPage: PER_PAGE,
    ...(search.trim() !== "" ? { search } : {}),
  };

  const response = await api.get<{ notes: RawNote[]; totalPages: number }>(
    BASE_URL,
    { params }
  );

  return {
    notes: response.data.notes.map(transformNote),
    totalPages: response.data.totalPages,
  };
};

interface CreateNoteData {
  title: string;
  content: string;
  tag: NoteTag;
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post<RawNote>(BASE_URL, noteData);
  return transformNote(response.data);
};

export const deleteNote = async (id: number): Promise<Note> => {
  const response = await api.delete<RawNote>(`${BASE_URL}/${id}`);
  return transformNote(response.data);
};
