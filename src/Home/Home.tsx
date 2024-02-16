import { View,Text, TextInput, FlatList,} from "react-native"
import { styles } from "./styles"
import { MagnifyingGlassPlus } from "phosphor-react-native"

export const Home = () => {
  return (
    <View style={styles.container}>
    <Text style={styles.headerText}>O que Você quer assistir hoje ?</Text>
    <View style={styles.containerInput}>
        <TextInput placeholderTextColor={"#fff"} placeholder="Buscar" style={styles.input}/>
        <MagnifyingGlassPlus color="#FFF" size={25} weight="light"/>
    </View>
    <View>
        <FlatList/>
    </View>
    </View>
  )
}
