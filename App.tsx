import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Home } from './src/screens/Home/Home';
import { Routes } from './src/routes';

export default function App() {
  return (
    <>
    <Routes/>
      <StatusBar style="auto" />
    </>
  );
}

