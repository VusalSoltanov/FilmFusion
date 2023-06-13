import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieById } from '../reducers/movieSlice';
import { RootState } from '../store/store';

interface DetailScreenProps {
  route: any;
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { movieId } = route.params;
  const dispatch = useDispatch();
  const movie = useSelector((state: RootState) => state.movies.movies.find((m) => m._id === movieId));
  const dark = useSelector((state: RootState) => state.themeSlice.dark);


  useEffect(() => {
    dispatch(fetchMovieById(movieId));
  }, [dispatch, movieId]);


  const containerStyle: any = {
    flex: 1,
    backgroundColor: dark ? '#fff' : '#1c1c1c',
  };

  const textStyles: any = {
    color: dark ? '#1c1c1c' : '#fff'
  };
  const categoryButtonStyle: any = {
    backgroundColor: dark ? '#DDE6ED' : 'rgba(255, 255, 255, 0.3)',

  };

  if (!movie) {
    return (
      <View style={[styles.container, containerStyle]}>
        <Text style={[styles.loadingText, textStyles]}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <View style={styles.movieDesc}>
        <Text style={[styles.name, textStyles]}>{movie.name}</Text>
        <Text style={[styles.description, textStyles]}>{movie.description}</Text>
        <Text style={[styles.relaseDate, textStyles]}>Release Date: {movie.releaseDate}</Text>
        <Text style={[styles.length, textStyles]}>Length: {movie.length}</Text>
        <Text style={[styles.length, textStyles]}>imdb: {movie.imdb}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1c1c1c',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    marginTop: 20,
    width: "80%",
    height: "65%",
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 15,
  },
  movieDesc: {
    alignItems: "center"
    ,
    marginHorizontal:10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',

  },
  description: {
    fontSize: 14,
    marginBottom: 5,
    marginHorizontal: 5,
    color: '#fff',
    alignSelf:"center"
  },
  relaseDate: {
    fontSize: 14,
    marginBottom: 2,
    color: '#fff',
  },
  length: {
    fontSize: 14,
    marginBottom: 2,
    color: '#fff',

  },
});

export default DetailScreen;
