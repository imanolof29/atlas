import { View, Text, FlatList } from "react-native";
import { useGetRuns } from "../../hooks/useGetRuns";
import { useAuthStore } from "../../stores/useAuth";
import { RouteMap } from "../../components/map/RouteMap";

const MapScreen = () => {

    const { user } = useAuthStore();

    const { data: runs } = useGetRuns(user?.id || "");

    return (
        <FlatList
            data={runs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                    <Text>Distance: {item.distance} meters</Text>
                    <Text>Duration: {item.duration} seconds</Text>
                    <Text>Pace: {item.pace} min/km</Text>
                    <Text>Started At: {new Date(item.started_at).toLocaleString()}</Text>
                    <RouteMap encodedPolyline={item.route} />
                </View>
            )}
        />
    )
}

export default MapScreen;