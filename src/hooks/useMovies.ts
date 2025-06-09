import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { FetchMoviesResponse } from '../types/movie';

const API_URL = 'https://api.themoviedb.org/3/search/movie';
const VITE_TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

const fetchMovies = async (query: string, page = 1): Promise<FetchMoviesResponse> => {
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

export const useMovies = (query: string, page: number) => {
  return useQuery<FetchMoviesResponse, Error>({
    queryKey: ['movies', query, page],
    queryFn: () => fetchMovies(query, page),
    enabled: !!query,
    staleTime: 1000 * 60, 
    placeholderData: (prevData) => prevData,
  });
};