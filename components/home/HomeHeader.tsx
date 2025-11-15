import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { defaultPadding } from "../../constants/Size";
import { Link } from "expo-router";

export const HomeHeader = () => {

    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.header, { paddingTop: insets.top }]}>
            <Text style={styles.title}>¡Hola, Runner!</Text>
            <Link href="/notifications" asChild>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: defaultPadding,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    }
})