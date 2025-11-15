import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "expo-router"
import { TouchableOpacity } from "react-native"

export const BackButton = () => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} />
        </TouchableOpacity>
    )
}