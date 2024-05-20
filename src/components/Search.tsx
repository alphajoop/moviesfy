import axios from 'axios';
import { SearchIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import Movie from './Movie';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { NavigationMenuLink } from './ui/navigation-menu';

interface MovieData {
  id: number;
  title: string;
  poster_path: string;
  key: string;
  release_date: string;
}

export default function Search() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<MovieData[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const searchMovies = useCallback(async () => {
    if (query.trim() === '') {
      setMovies([]);
      setNoResults(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'afcc4e756d500720208345094fe13a77',
          query: query,
        },
      });
      if (response.data.results.length === 0) {
        setNoResults(true);
      } else {
        setNoResults(false);
      }
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchMovies]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild className="cursor-pointer font-inter">
        <NavigationMenuLink>Search</NavigationMenuLink>
      </DialogTrigger>
      <DialogContent className="font-inter sm:max-w-[460px] max-sm:w-[335px] max-sm:p-0 rounded-lg mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <SearchIcon className="max-sm:ml-3" />
            <Input
              value={query}
              onChange={onChange}
              className="border-0 ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-0 focus:ring-0"
              placeholder="Search for a movie ..."
            />
          </DialogTitle>
          {query.trim() === '' && <DialogDescription className="max-sm:px-3">Search for your favorite movies and add them to your watchlist or mark as watched.</DialogDescription>}
        </DialogHeader>
        <div className="grid gap-4 py-4 mx-auto md:overflow-hidden overflow-y-auto md:max-h-[316px] overflow-x-hidden">
          {loading && <p className="text-center">Loading...</p>}
          {!loading && noResults && <p className="text-center">No results found.</p>}
          {!loading && !noResults && movies.slice(0, 3).map((movie) => <Movie key={movie.id} movie={movie} />)}
        </div>
      </DialogContent>
    </Dialog>
  );
}
