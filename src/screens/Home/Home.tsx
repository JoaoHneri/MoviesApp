import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlass, MagnifyingGlassPlus } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies/CardMovies";
import { useNavigation } from "@react-navigation/native";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export const Home = () => {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [searchResultMovies, setSearchResultMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResult, setNoResult] = useState(false);
  const [search, setSearch] = useState("");


  const loadMoreData = async () => {
    setLoading(true);
    const response = await api.get("/movie/popular", {
      params:{
        page,
      }
    });
    setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
    setPage(page + 1);
    setLoading(false)
  };

  useEffect(() => {
    loadMoreData();
  }, []);


  const searchMovie = async (query: string ) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params:{
        query,
      }
    });

    if(response.data.results.length === 0) {
      setNoResult(true);
    }else{
      setSearchResultMovies(response.data.results)
    }
    setLoading(false)
  }

  const handleSearch = (text: string) => {
    setSearch(text)
    if(text.length >2){
      searchMovie(text);
    }else{
      setSearchResultMovies([])
    }
  };

  const movieData = search.length > 2 ? searchResultMovies : discoveryMovies;

  const navigation = useNavigation();

  const renderMovieItem = ({ item }: { item: Movie }) => (
    <CardMovies
      data={item}
      onPress={() => {
        navigation.navigate("Details", { movieId: item.id });
      }}
    />
  );

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>O que Você quer assistir hoje ?</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholderTextColor={"#fff"}
          placeholder="Buscar"
          style={styles.input}
          value={search}
          onChangeText={handleSearch}
        />
        <MagnifyingGlass color="#FFF" size={25} weight="light" />
      </View>
      {noResult && search.length > 0 && (
        <Text style={styles.noResult}>
          Nenhun filme encontrado para "{search}"
        </Text>
      )
      }

      </View>
      <View>
        <FlatList
          data={movieData}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
          onEndReached={() => loadMoreData()}
          onEndReachedThreshold={0.5}
          style={styles.contentFlat}
        />

        {loading && <ActivityIndicator size={50} color="#0296e6"/>}

      </View>
    </View>
  );
};
