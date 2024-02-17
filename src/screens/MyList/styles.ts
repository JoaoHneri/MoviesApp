import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#242A32',
  },
  header: {
    paddingTop: 40,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30, // Ajuste conforme necessário
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  contentMyList: {
    width: "100%",
    padding: 20,
    gap: 25,
    marginBottom: 25,
  },
  card: {
    width: 250,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  cardImage: {
    width: 110,
    height: 160,
    borderRadius: 16,
  },
  cardInfo:{
    flexDirection: "column",
    height: "100%",

  },
  titleInfo:{
    color: "#fff",
    fontSize: 19,
  },
  movieInfosContent:{
    paddingTop: 20,
    
  },
  iconsContent:{
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    width: "100%",
  },
  cardInfoInfoMovieContentText: {
    color: "#FFF",
    fontSize: 15,
    marginLeft: 10 ,
  },
  cardInfoInfoMovieContentText2:{
    color: "#FF8700",
    fontWeight: "700",
    marginLeft: 10 ,
    fontSize: 15,
  },
  moviesEmpty: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  moviesEmptyTitle: {
    color: "#EBEBEF",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 10,
    letterSpacing: 0.12,
    lineHeight: 35,
  },
  moviesEmptyText: {
    color: "#92929D",
    letterSpacing: 0.12,
    lineHeight: 35,
  },

});
