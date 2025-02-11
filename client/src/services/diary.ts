import axios from 'axios';

export interface DiaryEntry {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
  mood: string;
}

const API_BASE_URL = 'http://localhost:3000/api';

export const getDiaries = async (): Promise<DiaryEntry[]> => {
  const response = await axios.get(`${API_BASE_URL}/diaries`);
  return response.data.map((diary: any) => ({
    id: diary._id,
    title: diary.title,
    content: diary.content,
    date: diary.date,
    tags: diary.tags,
    mood: diary.mood
  }));
};

export const createDiary = async (diary: Omit<DiaryEntry, 'id'>): Promise<DiaryEntry> => {
  const response = await axios.post(`${API_BASE_URL}/diaries`, diary);
  return {
    id: response.data._id,
    title: response.data.title,
    content: response.data.content,
    date: response.data.date,
    tags: response.data.tags,
    mood: response.data.mood
  };
};

export const updateDiary = async (id: string, diary: Partial<DiaryEntry>): Promise<DiaryEntry> => {
  const response = await axios.put(`${API_BASE_URL}/diaries/${id}`, diary);
  return {
    id: response.data._id,
    title: response.data.title,
    content: response.data.content,
    date: response.data.date,
    tags: response.data.tags,
    mood: response.data.mood
  };
};

export const deleteDiary = async (id: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/diaries/${id}`);
};