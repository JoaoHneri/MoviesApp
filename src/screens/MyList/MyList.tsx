import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./styles";
import { CalendarBlank, CaretLeft, Clock, SmileyXEyes, Star } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { MovieContext } from "../../context/MoviesContent";
import { CardMovies } from "../../components/CardMovies/CardMovies";

export const MyList = () => {
  const { goBack, navigate } = useNavigation();
  const { allFavoriteMovies } = useContext(MovieContext);

  function getYear(data: string) {
    const ano = new Date(data).getFullYear();
    return ano;
  }

  function truncateText(text, maxLength) {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength - 3) + '...';
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Assitir Mais tarde</Text>

        <View></View>
      </View>

      {allFavoriteMovies.length > 0 && (
      <ScrollView style={styles.contentMyList}>
        {allFavoriteMovies.map((movie) => (
          <TouchableOpacity
            onPress={() => navigate("Details", { movieId: movie.id })}
            key={movie.id}
            style={styles.card}
          >
            <Image
              style={styles.cardImage}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              }}
            />
            <View style={styles.cardInfo}>
              <Text style={styles.titleInfo}>{truncateText(movie.title, 16)}</Text>
              <View style={styles.movieInfosContent}>
                <View style={styles.iconsContent}>
                  <Star
                    color={
                      movie.vote_average.toFixed(1) > "7" ? "#FF8700" : "#FFF"
                    }

                    size={25}
                    weight={
                      movie.vote_average.toFixed(1) > "7"
                        ? "duotone"
                        : "light"
                    }

                    
                  />
                  <Text
                    style={[
                      movie.vote_average.toFixed(1) > "7"
                        ? styles.cardInfoInfoMovieContentText2
                        : styles.cardInfoInfoMovieContentText,
                    ]}
                  >
                    {movie.vote_average.toFixed(1)}
                  </Text>
                </View>

                <View style={styles.iconsContent}>
                  <CalendarBlank color={"#FFF"}  size={25}/>
                  <Text style={styles.cardInfoInfoMovieContentText}>{getYear(movie.release_date)}</Text>
                </View>

                <View style={styles.iconsContent}>
                  <Clock color={"#FFF"} size={25}/>
                  <Text style={styles.cardInfoInfoMovieContentText}>{movie.runtime} minutos</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      )}

{allFavoriteMovies.length <= 0 && (
        <View style={styles.moviesEmpty}>
          <SmileyXEyes size={200} color="#92929D"/>
          <Text style={styles.moviesEmptyTitle}>
            Ainda não há filmes na lista
          </Text>
          <Text style={styles.moviesEmptyText}>
            Encontre o seu filme favorito para adicionar na lista
          </Text>
        </View>
      )}
    </View>
  );
};
