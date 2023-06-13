import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import SvgSaveIcon from '../assets/svg/SaveIcon';
import { fetchMovieById, fetchMovies, removeMovie, saveMovie } from '../reducers/movieSlice';
import { AppDispatch, RootState } from '../store/store';

interface Category {
  _id: string;
  name: string;
  movies: Movie[];
}

interface Movie {
  _id: string;
  name: string;
  description: string;
  length: string;
  releaseDate: string;
  image: string;
  categories: Category[];
}

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector<RootState, any>((state) => state.movies.movies);
  const loading = useSelector<RootState>((state) => state.movies.loading);
  const dark = useSelector((state: RootState) => state.themeSlice.dark);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    

    fetchSavedMovies();
  }, []);
  const fetchSavedMovies = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('savedMovies');
      if (jsonValue) {
        const savedMoviesData = JSON.parse(jsonValue);
        setSavedMovies(savedMoviesData);
      }
    } catch (error) {
      console.log('Error fetching saved movies:', error);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      const fetchMoviesCallback = async () => {
        dispatch(fetchMovies());
      };
    fetchSavedMovies();

      fetchMoviesCallback();
    }, [dispatch])
  );

  const onRefresh = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    dispatch(fetchMovies());
  };

  const fetchMovieDetails = (movieId: string) => {
    dispatch(fetchMovieById(movieId));
    navigation.navigate('Detail', { movieId });
  };

  const handleSaveMovie = async (movie: Movie) => {
    const movieIndex = savedMovies.findIndex((m) => m._id === movie._id);
    let updatedSavedMovies: Movie[];

    if (movieIndex === -1) {
      dispatch(saveMovie(movie));
      updatedSavedMovies = [...savedMovies, movie];
    } else {
      dispatch(removeMovie(movie._id));
      updatedSavedMovies = savedMovies.filter((m) => m._id !== movie._id);
    }

    setSavedMovies(updatedSavedMovies);

    try {
      const jsonValue = JSON.stringify(updatedSavedMovies);
      await AsyncStorage.setItem('savedMovies', jsonValue);
    } catch (error) {
      console.log('Error saving movies:', error);
    }
  };

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

  const renderMovieItem = ({ item }: { item: Movie }) => {
    const isSaved = savedMovies.some((m) => m._id === item._id);

    return (
      <TouchableOpacity
        style={styles.movieContainer}
        onPress={() => fetchMovieDetails(item._id)}
      >
        <View style={styles.imageContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <TouchableOpacity
            style={styles.saveSvgContainer}
            onPress={() => handleSaveMovie(item)}
          >
            <SvgSaveIcon
              width={26}
              height={26}
              fill={isSaved ? 'white' : 'none'}
              stroke={'white'}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.movieDesc}>
          <Text style={[styles.name, textStyles]}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View>
      <Text style={[styles.categoryTitle, textStyles]}>{item.name}</Text>
      <FlatList
        horizontal
        data={item.movies}
        keyExtractor={(movie) => movie._id}
        renderItem={renderMovieItem}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  const groupMoviesByCategory = () => {
    const groupedMovies: Category[] = [];
    const filteredMovies = movies.filter((movie: any) =>
      movie.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filteredMovies.forEach((movie: any) => {
      movie.categories.forEach((category: any) => {
        const existingCategory = groupedMovies.find(
          (groupedCategory) => groupedCategory._id === category._id
        );
        if (existingCategory) {
          existingCategory.movies.push(movie);
        } else {
          groupedMovies.push({
            _id: category._id,
            name: category.name,
            movies: [movie],
          });
        }
      });
    });

    return groupedMovies;
  };

  const groupedMovies = groupMoviesByCategory();

  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryId);
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.searchInput, categoryButtonStyle]}
        placeholder="Search movies..."
        placeholderTextColor="#1c1c1c"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryButtonsContainer}
      >
        {groupedMovies.map((category) => (
          <TouchableOpacity
            key={category._id}
            style={[
              styles.categoryButton,
              categoryButtonStyle,
              selectedCategory === category._id ? styles.selectedCategoryButton : null,
            ]}
            onPress={() => handleCategoryPress(category._id)}
          >
            <Text style={[styles.categoryButtonText, textStyles]}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <Text style={[styles.loadingText, textStyles]}>Loading...</Text>
      ) : (
        <FlatList
          data={groupedMovies}
          keyExtractor={(category) => category._id}
          refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            if (selectedCategory === null || selectedCategory === item._id) {
              return renderCategoryItem({ item });
            }
            return null;
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
    paddingTop: 20,
    alignItems: "center"
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    marginTop: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginLeft: 10,
  },
  movieContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: 250,
    height: 350,
    resizeMode: 'cover',
    marginHorizontal: 8,
    borderRadius: 15,
  },
  saveSvgContainer: {
    position: 'absolute',
    top: 5,
    right: 13,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 13,
    padding: 5,
  },
  movieDesc: {
    marginTop: 5,
  },
  name: {
    color: '#fff',
    fontWeight: '800',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    width: '92%',
    height: 40,
    backgroundColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 5,
    color: '#fff',
  },
  categoryButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  categoryButton: {

    width: 150,
     height: 25,
    borderRadius: 20,
    margin: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedCategoryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: "center"
  },
});

export default HomeScreen;
