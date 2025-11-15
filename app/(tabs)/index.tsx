import { Ionicons } from "@expo/vector-icons";
import { Link, Stack } from "expo-router"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Colors } from "../../constants/Colors";
import { HomeHeader } from "../../components/home/HomeHeader";
import { defaultPadding } from "../../constants/Size";

const HomeScreen = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (<HomeHeader />)
                }}
            />
            <View style={styles.container}>
                <Link asChild href="/run">
                    <TouchableOpacity style={styles.runButton}>
                        <Ionicons name="play" size={16} color="white" />
                        <Text style={styles.runButtonText}>Iniciar carrera</Text>
                    </TouchableOpacity>
                </Link>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: defaultPadding,
        flex: 1,
        justifyContent: 'center',
    },
    runButton: {
        backgroundColor: Colors.primary,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    runButtonText: {
        color: 'white',
        padding: 12,
        fontSize: 16,
    }
})

export default HomeScreen;