export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  key: string;
  release_date: string;
}

export interface State {
  watchlist: Movie[];
  watched: Movie[];
}

export type Action =
  | { type: 'ADD_MOVIE_TO_WATCHLIST'; payload: Movie }
  | { type: 'REMOVE_MOVIE_FROM_WATCHLIST'; payload: number }
  | { type: 'ADD_MOVIE_TO_WATCHED'; payload: Movie }
  | { type: 'REMOVE_MOVIE_FROM_WATCHED'; payload: number };
