import { GlobalContext } from '@/context/GlobalState';
import { XIcon } from 'lucide-react';
import { useContext } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

export default function Watched() {
  const { watched, removeMovieFromWatched } = useContext(GlobalContext);
  return (
    <Card className="container font-inter w-full max-sm:shadow-none max-w-6xl max-sm:border-0 max-md:p-2">
      <CardHeader>
        <CardTitle className="font-medium">Watched list</CardTitle>
        <CardDescription>Movies you've already watched</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {watched.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-10">
            {watched.map((movie) => (
              <div key={movie.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img alt="Movie Poster" className="rounded-lg object-cover movie-cover" height={100} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} width={70} />
                  <div>
                    <h4 className="font-medium max-sm:text-sm">{movie.title}</h4>
                    <p className="text-sm text-gray-500">1972</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {/** <Button size="icon" variant="ghost" onClick={() => addMovieToWatched(movie)}>
                      <CheckIcon className="w-5 h-5" />
                    </Button> */}
                  <Button size="icon" variant="ghost" onClick={() => removeMovieFromWatched(movie.id)}>
                    <XIcon className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No movies in your watched !</p>
        )}
      </CardContent>
    </Card>
  );
}
