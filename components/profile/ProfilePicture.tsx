import { Ionicons } from "@expo/vector-icons"
import { View, Image, StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../constants/Colors"

type Props = {
    uri: string,
    onPress?: () => void,
}

export const ProfilePicture = ({ uri, onPress }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Image
                source={{ uri }}
                style={styles.image}
            />
            <View style={styles.iconContainer}>
                <Ionicons name="pencil" size={16} color="black" />
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Colors.destructive,
        borderRadius: 15,
        padding: 4,
    }
})