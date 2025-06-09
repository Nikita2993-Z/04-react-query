import { useState } from 'react';
import toast from 'react-hot-toast';

import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';
import Pagination from '../Pagination/Pagination';

import { fetchMovies } from '../../services/movieService';
import { Movie } from '../../types/movie';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const handleSearch = async (newQuery: string) => {
    if (!newQuery.trim()) {
      toast.error('Please enter your search query.');
      return;
    }

    setQuery(newQuery);
    setPage(1);
    await fetchAndSetMovies(newQuery, 1);
  };

  const fetchAndSetMovies = async (searchQuery: string, currentPage: number) => {
    setLoading(true);
    setError(false);
    setMovies([]);

    try {
      const { results, total_pages } = await fetchMovies(searchQuery, currentPage);
      if (results.length === 0) {
        toast('No movies found for your request.');
      }
      setMovies(results);
      setTotalPages(total_pages);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (selectedPage: number) => {
    setPage(selectedPage);
    fetchAndSetMovies(query, selectedPage);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && (
        <>
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              onPageChange={handlePageChange}
            />
          )}
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        </>
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </>
  );
};

export default App;