import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#242A32',
    },
    header:{
        padding: 20,
    },
    headerText: {
        marginTop: 30,
        fontSize: 18,
        lineHeight: 25,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
    containerInput:{
        backgroundColor: '#67686D',
        height: 42,
        padding: 10,
        borderRadius: 16,
        marginTop: 24,
        marginBottom: 20,
        color: '#67686D',
        alignItems: 'center',
        justifyContent: "space-between", 
        flexDirection: "row",
    },
    input:{
        color: '#FFF',
        width: '80%',
        paddingLeft: 16,
    },
  });
  