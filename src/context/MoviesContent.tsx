import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";

type Movie = {
  id: number;
  title: string;
  poster_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type MovieContextData = {
  favoriteMovies: number[];
  allFavoriteMovies: Movie[];
  addFavoriteMovies: (movieId: number) => void;
  removeFavoriteMovies: (movieId: number) => void;
};

export const MovieContext = createContext<MovieContextData>({
  favoriteMovies: [],
  allFavoriteMovies: [],
  addFavoriteMovies: () => {},
  removeFavoriteMovies: () => {},
});

type MovieProviderProps = {
  children: React.ReactNode;
};

export function MovieProvider({ children }: MovieProviderProps) {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([]);
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMoviesStoraged = await AsyncStorage.getItem(
        "@favoriteMovies"
      );

      if (favoriteMoviesStoraged) {
        setFavoriteMovies(JSON.parse(favoriteMoviesStoraged));
      }
    }
    loadFavoriteMovies()
  }, []);

  const addFavoriteMovies = useCallback(
    async (movieId: number) => {
      if (!favoriteMovies.includes(movieId)) {
        const newFavoriteMovies = [...favoriteMovies, movieId];
        setFavoriteMovies(newFavoriteMovies);
        await AsyncStorage.setItem(
          "@FavoriteMovies",
          JSON.stringify(newFavoriteMovies)
        );
      }
    },
    [favoriteMovies]
  );


  const removeFavoriteMovies = useCallback(
    async (movieId: number) => {
      const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId);
      setFavoriteMovies(newFavoriteMovies);
      await AsyncStorage.setItem(
        "@FavoriteMovies",
        JSON.stringify(newFavoriteMovies)
      );
    },
    [favoriteMovies]
  );


  const parsedFavoriteMovies = useMemo(() => favoriteMovies, [favoriteMovies]);

  const getAllFavoriteMovies = useCallback(async () => {
    try {
      const movies = await Promise.all(
        parsedFavoriteMovies.map(async (movieId: number) => {
          const response = await api.get<Movie>(`/movie/${movieId}`);
          return response.data;
        })
      );
      setAllFavoriteMovies(movies);
    } catch (error) {
      console.log(error);
    }
  }, [parsedFavoriteMovies]);

  useEffect(() => {
    getAllFavoriteMovies();
  }, [parsedFavoriteMovies, getAllFavoriteMovies]);

  
  const contextData: MovieContextData = {
    favoriteMovies,
    allFavoriteMovies,
    addFavoriteMovies,
    removeFavoriteMovies,
  };

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  );

}
