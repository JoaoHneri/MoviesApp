import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Home } from "./src/screens/Home/Home";
import { Routes } from "./src/routes";
import { MovieProvider } from "./src/context/MoviesContent";

export default function App() {
  return (
    <>
      <MovieProvider>
        <Routes />
        <StatusBar style="auto" />
      </MovieProvider>
    </>
  );
}
