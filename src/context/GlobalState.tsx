import React, { ReactNode, createContext, useEffect, useReducer } from 'react';
import { Action, Movie, State } from '../types/types';
import AppReducer from './AppReducer';

// Initial State
const initialState: State = {
  watchlist: JSON.parse(localStorage.getItem('watchlist') || '[]'),
  watched: JSON.parse(localStorage.getItem('watched') || '[]'),
};

// Create context
interface GlobalContextProps {
  watchlist: Movie[];
  watched: Movie[];
  addMovieToWatchList: (movie: Movie) => void;
  removeMovieFromWatchList: (id: number) => void;
  addMovieToWatched: (movie: Movie) => void;
  removeMovieFromWatched: (id: number) => void;
}

export const GlobalContext = createContext<GlobalContextProps>({
  watchlist: [],
  watched: [],
  addMovieToWatchList: () => {},
  removeMovieFromWatchList: () => {},
  addMovieToWatched: () => {},
  removeMovieFromWatched: () => {},
});

// Provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(AppReducer, initialState);

  // Use useEffect to update local storage whenever watchlist or watched changes
  useEffect(() => {
    localStorage.setItem('watchlist', JSON.stringify(state.watchlist));
    localStorage.setItem('watched', JSON.stringify(state.watched));
  }, [state.watchlist, state.watched]);

  // Actions
  const addMovieToWatchList = (movie: Movie) => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHLIST', payload: movie });
  };

  const removeMovieFromWatchList = (id: number) => {
    dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHLIST', payload: id });
  };

  const addMovieToWatched = (movie: Movie) => {
    dispatch({ type: 'ADD_MOVIE_TO_WATCHED', payload: movie });
  };

  const removeMovieFromWatched = (id: number) => {
    dispatch({ type: 'REMOVE_MOVIE_FROM_WATCHED', payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchList,
        removeMovieFromWatchList,
        addMovieToWatched,
        removeMovieFromWatched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
