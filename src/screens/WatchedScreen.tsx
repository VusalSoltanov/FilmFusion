// ./src/screens/WatchedScreen

import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeMovie, setSavedMovies } from '../reducers/movieSlice';
import SvgDeleteIcon from '../assets/svg/DeleteIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchedScreen = () => {
  const dispatch = useDispatch();
  const savedMovies = useSelector<RootState, any>((state) => state.movies.savedMovies);
  const dark = useSelector((state: RootState) => state.themeSlice.dark);
  const [removingMovieId, setRemovingMovieId] = useState<string | null>(null);
  const scaleAnim = useRef(new Animated.Value(1)).current; 
  useEffect(() => {
    const loadSavedMovies = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('savedMovies');
        if (jsonValue) {
          const savedMovies = JSON.parse(jsonValue);
          dispatch(setSavedMovies(savedMovies));
        }
      } catch (error) {
        console.log('Error loading saved movies from storage:', error);
      }
    };

    loadSavedMovies();
  }, []);

  const handleRemoveMovie = (movieId: string) => {
    setRemovingMovieId(movieId);
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      dispatch(removeMovie(movieId));
      scaleAnim.setValue(1);
      setRemovingMovieId(null);
    });
  };

  const containerStyle: any = {
    flex: 1,
    backgroundColor: dark ? '#fff' : '#1c1c1c',
  };

  const textStyles: any = {
    color: dark ? '#1c1c1c' : '#fff'
  };

  const renderMovieItem = ({ item }: { item: any }) => {
    const animatedStyle = { transform: [{ scale: removingMovieId === item._id ? scaleAnim : 1 }] };
    return (
      <Animated.View style={[styles.movieContainer, containerStyle, animatedStyle]}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={[styles.movieName, textStyles]}>{item.name}</Text>
        <TouchableOpacity style={styles.svgContainer}>
          <SvgDeleteIcon
            width={24}
            height={24}
            fill="silver"
            stroke="#000"
            onPress={() => handleRemoveMovie(item._id)}
          />
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, textStyles]}>Watched Movies</Text>
      {savedMovies.length > 0 ? (
        <FlatList
          data={savedMovies}
          keyExtractor={(movie) => movie._id}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.emptyText}>No movies saved yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1c1c1c"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#fff"
  },
  movieContainer: {
    marginBottom: 10,
  },
  movieName: {
    marginTop: 10,
    fontWeight: 'bold',
    color: "#fff",
    fontSize: 22
  },
  svgContainer: {
    position: 'absolute',
    borderRadius: 13,
    top: 358,
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    left: 215
  },
  image: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    marginRight: 10,
    borderRadius: 15,
  },
  emptyText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: "#fff"
  },
});

export default WatchedScreen;
