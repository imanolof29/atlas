import { useMemo } from "react";
import { decodePolyline } from "../../utils/polyline";
import MapView, { Polyline } from "react-native-maps";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/Colors";

type Props = {
    encodedPolyline: string;
}

export const RouteMap = ({ encodedPolyline }: Props) => {
    const coordinates = useMemo(() => {
        return decodePolyline(encodedPolyline);
    }, [encodedPolyline]);

    const region = useMemo(() => {
        if (coordinates.length === 0) return null;

        const lats = coordinates.map(c => c.latitude);
        const lngs = coordinates.map(c => c.longitude);

        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);

        return {
            latitude: (minLat + maxLat) / 2,
            longitude: (minLng + maxLng) / 2,
            latitudeDelta: (maxLat - minLat) * 1.3,
            longitudeDelta: (maxLng - minLng) * 1.3,
        };
    }, [coordinates]);

    if (!region) return null;



    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={region}
            >
                <Polyline
                    coordinates={coordinates}
                    strokeColor={Colors.primary}
                    strokeWidth={4}
                    lineCap="round"
                    lineJoin="round"
                />
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 100,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});