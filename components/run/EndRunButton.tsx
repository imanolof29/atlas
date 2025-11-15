import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { Colors } from "../../constants/Colors"

type Props = {
    onClick?: () => void;
}

export const EndRunButton = ({ onClick }: Props) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onClick}>
            <Text style={styles.text}>End Run</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.destructive,
        borderRadius: 8,
        padding: 12,
    },
    text: {
        fontSize: 18,
        color: 'white',
    }
})