import axios from 'axios';
import { Movie } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (query: string, page = 1): Promise<FetchMoviesResponse> => {
  const config = {
    params: {
      query,
      page,
      language: 'en-US',
    },
    headers: {
      Authorization: `Bearer ${VITE_TMDB_TOKEN}`,
    },
  };

  const { data } = await axios.get<FetchMoviesResponse>(API_URL, config);
  return data;
};