import { GlobalContext } from '@/context/GlobalState';
import { CheckIcon, XIcon } from 'lucide-react';
import { useContext } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function WatchList() {
  const { watchlist, addMovieToWatched, removeMovieFromWatchList } = useContext(GlobalContext);
  return (
    <Card className="container font-inter w-full max-sm:shadow-none max-w-6xl max-sm:border-0 max-md:p-2">
      <CardHeader>
        <CardTitle className="font-medium">Watchlist</CardTitle>
        <CardDescription>Movies you want to watch</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {watchlist.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {watchlist.map((movie) => (
              <div key={movie.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img alt="Movie Poster" className="rounded-lg object-cover movie-cover" height={100} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} width={70} />
                  <div>
                    <h4 className="font-medium max-sm:text-sm">{movie.title}</h4>
                    <p className="text-sm text-gray-500">{movie.release_date.split('-')[0]}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => addMovieToWatched(movie)}>
                    <CheckIcon className="w-5 h-5" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => removeMovieFromWatchList(movie.id)}>
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies in your watch list, add some!</p>
        )}
      </CardContent>
    </Card>
  );
}
