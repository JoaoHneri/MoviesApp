import { FilmSlate, MagnifyingGlass } from "phosphor-react-native";
import { ActivityIndicator, FlatList, Text, TextInput, View } from "react-native";
import { styles } from "./styles";
import { useState } from "react";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies/CardMovies";
import { useNavigation } from "@react-navigation/native";


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}


export const Search = () => {
  const [search, setSearch] = useState("");
  const [searchResultMovies, setSearchResultMovies] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = (text: string) => {
    setSearch(text);
    if (text.length > 2) {
      searchMovie(text);
    } else {
      setSearchResultMovies([]);
    }
  };

  const searchMovie = async (query: string) => {
    setLoading(true);
    const response = await api.get("/search/movie", {
      params: {
        query,
      },
    });

    if (response.data.results.length === 0) {
      setNoResult(true);
    } else {
      setSearchResultMovies(response.data.results);
    }
    setLoading(false);
  };
  const navigation = useNavigation()
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
        {noResult && search.length > 0 && searchResultMovies.length === 0 &&  (
          <Text style={styles.noResult}>
            Nenhum filme encontrado para "{search}"
          </Text>
        )}
      </View>
      <View>
           <FlatList
          data={searchResultMovies}
          numColumns={3}
          renderItem={renderMovieItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
          style={styles.contentFlat}
        />

        {searchResultMovies.length === 0 && !noResult &&  (
            <View style={styles.searchEmpty}>
            <FilmSlate size={200} color="#92929D"/>
            <Text style={styles.searchEmptyTitle}>
              Procure Filmes
            </Text>
            <Text style={styles.searchEmptyText}>
              Procure e encontre o seu filme favorito
            </Text>
          </View>
          ) 
          }

        {loading && <ActivityIndicator size={50} color="#0296e6" />}
      </View>
    </View>
  );
};
