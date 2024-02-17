import { Text, TouchableOpacity, View } from "react-native"
import { styles } from "./styles"
import { CaretLeft } from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

export const MyList = () => {

  const {goBack} = useNavigation();
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity onPress={() => goBack()}>
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>

        <Text style={styles.headerText}>Assitir Mais tarde</Text>

        <View></View>
      </View>
    </View>
  )
}
