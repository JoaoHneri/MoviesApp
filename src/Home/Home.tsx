import { View, Text, TextInput, FlatList } from "react-native";
import { styles } from "./styles";
import { MagnifyingGlassPlus } from "phosphor-react-native";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { CardMovies } from "../components/CardMovies/CardMovies";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

export const Home = () => {
  const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState(1);
  const loadMoreData = async () => {
    const response = await api.get("/movie/popular", {
      params:{
        page,
      }
    });
    setDiscoveryMovies(response.data.results);
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.headerText}>O que Você quer assistir hoje ?</Text>
      <View style={styles.containerInput}>
        <TextInput
          placeholderTextColor={"#fff"}
          placeholder="Buscar"
          style={styles.input}
        />
        <MagnifyingGlassPlus color="#FFF" size={25} weight="light" />
      </View>
      </View>
      <View>
        <FlatList
          data={discoveryMovies}
          numColumns={3}
          renderItem={(item) => <CardMovies data={item.item} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            padding: 35,
            paddingBottom: 100,
          }}
        />
      </View>
    </View>
  );
};
