import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Movie {
  _id: string;
  name: string;
  description: string;
  length: string;
  releaseDate: string;
  image: string;
  imdb: string;
  categories: string;
}

interface MovieState {
  movies: Movie[];
  loading: boolean;
  error: string | null|undefined;
  currentMovie: Movie | null;
  savedMovies: Movie[];
}

const initialState: MovieState = {
  movies: [],
  loading: false,
  error: null,
  currentMovie: null,
  savedMovies: [],
};

const saveMoviesToStorage = async (savedMovies: Movie[]) => {
  try {
    const jsonValue = JSON.stringify(savedMovies);
    await AsyncStorage.setItem('savedMovies', jsonValue);
  } catch (error) {
    console.log('Error saving movies to storage:', error);
  }
};

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  const response = await axios.get<Movie[]>('http://172.17.144.1:8080/api/movies');
  return response.data;
});

export const fetchMovieById = createAsyncThunk('movies/fetchMovieById', async (movieId: string) => {
  const response = await axios.get<Movie>(`http://172.17.144.1:8080/api/movies/${movieId}`);
  return response.data;
});

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    saveMovie: (state, action: PayloadAction<Movie>) => {
      const existingMovie = state.savedMovies.find(movie => movie._id === action.payload._id);
      if (!existingMovie) {
        state.savedMovies.push(action.payload);
        saveMoviesToStorage(state.savedMovies); 
      }
    },
    removeMovie: (state, action: PayloadAction<string>) => {
      state.savedMovies = state.savedMovies.filter(movie => movie._id !== action.payload);
      saveMoviesToStorage(state.savedMovies); 
    },
    setSavedMovies: (state, action: PayloadAction<Movie[]>) => {
      state.savedMovies = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.currentMovie = null;
      })
      .addCase(fetchMovieById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentMovie = action.payload;
      })
      .addCase(fetchMovieById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.currentMovie = null;
      });
  },
});

export const { saveMovie, removeMovie, setSavedMovies } = movieSlice.actions;

export default movieSlice.reducer;
