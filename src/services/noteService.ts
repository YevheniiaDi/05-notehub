import axios from 'axios';

interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

interface Note {
  id: string;
  title: string;
  content: string;
  
}

interface FetchNotesResponse {
  results: Note[];
  total: number;
  totalPages: number;
}

export const fetchNotes = async ({ page, perPage, search }: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response = await axios.get('/api/notes', {
    params: {
      page,
      perPage,
      search,
    },
  });
  return response.data;
};

export const deleteNote = async (id: string): Promise<void> => {
  await axios.delete(`/api/notes/${id}`);
};

interface CreateNoteData {
  title: string;
  content: string;
  
}

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await axios.post('/api/notes', noteData);
  return response.data;
};