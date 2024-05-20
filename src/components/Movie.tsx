import { CheckIcon, PlusIcon } from 'lucide-react';
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Movie as MovieType } from '../types/types.ts';
import { Button } from './ui/button.tsx';

interface MovieProps {
  movie: MovieType;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const { addMovieToWatchList, addMovieToWatched, watchlist, watched } = useContext(GlobalContext);

  const storedMovie = watchlist.find((o) => o.id === movie.id);
  const storedMovieWatched = watched.find((o) => o.id === movie.id);

  const watchlistDisabled = !!storedMovie || !!storedMovieWatched;
  const watchedDisabled = !!storedMovieWatched;

  return (
    <div className="flex font-inter justify-center items-center gap-x-4 flex-shrink-0 mx-auto px-3 md:px-0">
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} className="max-w-14 flex-shrink-0 rounded-sm object-cover" alt={`${movie.title} Poster`} />
      <div className="">
        <div className="mb-1">
          <p>{movie.title}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="max-sm:text-xs max-sm:max-w-28" disabled={watchlistDisabled} onClick={() => addMovieToWatchList(movie)}>
            <PlusIcon className="md:mr-1 max-sm:hidden" />
            Add to Watchlist
          </Button>
          <Button size="sm" className="max-sm:text-xs max-sm:max-w-28" variant="outline" disabled={watchedDisabled} onClick={() => addMovieToWatched(movie)}>
            <CheckIcon className="md:mr-1 max-sm:hidden" />
            Add to Watched
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
