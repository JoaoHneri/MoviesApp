import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { useRoute } from "@react-navigation/native";
import { styles } from "./styles";
import { BookmarkSimple, CaretLeft } from "phosphor-react-native";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type RouteProps = {
  movieId: number;
};

export const Details = () => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);

  const route = useRoute();
  const { movieId } = route.params as RouteProps;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieId}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Detalhes</Text>

        <TouchableOpacity>
          <BookmarkSimple color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
      </View>

      <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`,
          }}
          style={styles.detailsImage}
        />

        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`,
          }}
          style={styles.detailsPosterImage}
        />

        <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
      </View>
    </View>
  );
};
