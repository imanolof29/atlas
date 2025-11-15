import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { defaultPadding } from "../../constants/Size";
import { Colors } from "../../constants/Colors";
import { BackButton } from "../common/BackButton";
import { useRunStore } from "../../stores/useRun";

export const RunHeader = () => {
    const insets = useSafeAreaInsets();
    const { isPaused, pauseTracking, resumeTracking } = useRunStore();

    const handleTogglePause = () => {
        isPaused ? resumeTracking() : pauseTracking();
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <View style={styles.side}>
                <BackButton />
            </View>

            <Text style={styles.title}>Exploración</Text>

            <View style={styles.side}>
                <TouchableOpacity
                    onPress={handleTogglePause}
                    style={styles.controlButton}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={isPaused ? "play" : "pause"}
                        size={24}
                        color={"#FFF"}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: defaultPadding,
        paddingBottom: 10,
    },
    side: {
        width: 40,
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        flex: 1,
        textAlign: "center",
    },
    controlButton: {
        backgroundColor: Colors.destructive,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
});