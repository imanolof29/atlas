import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';
import * as Location from 'expo-location';
import { StatItem } from '../components/run/StatItem';
import { EndRunButton } from '../components/run/EndRunButton';
import { Stack } from 'expo-router';
import { useRunStore } from '../stores/useRun';
import { Colors } from '../constants/Colors';
import { defaultPadding } from '../constants/Size';
import { usePostRun } from '../hooks/usePostRun';
import { useAuthStore } from '../stores/useAuth';
import { RunHeader } from '../components/run/RunHeader';


const RunScreen = () => {

    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const locationSubscription = useRef<Location.LocationSubscription | null>(null);
    const durationInterval = useRef<NodeJS.Timeout | null>(null);

    const {
        pace,
        distance,
        duration,
        isTracking,
        isPaused,
        pauseTracking,
        resumeTracking,
        startTracking,
        addLocation,
        incrementDuration,
        locations
    } = useRunStore();

    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }

        getCurrentLocation();
    }, []);

    useEffect(() => {
        startTracking();
    }, []);

    useEffect(() => {
        let subscription: Location.LocationSubscription | null = null;

        const startLocationTracking = async () => {
            if (isTracking && !isPaused) {
                subscription = await Location.watchPositionAsync(
                    {
                        accuracy: Location.Accuracy.BestForNavigation,
                        timeInterval: 1000,
                        distanceInterval: 5,
                    },
                    (newLocation) => {
                        setLocation(newLocation);
                        addLocation(newLocation);
                    }
                );
                locationSubscription.current = subscription;
            }
        };

        startLocationTracking();

        return () => {
            if (subscription) {
                subscription.remove();
            }
        };
    }, [isTracking, isPaused]);

    useEffect(() => {
        if (isTracking && !isPaused) {
            durationInterval.current = setInterval(() => {
                incrementDuration();
            }, 1000);
        } else {
            if (durationInterval.current) {
                clearInterval(durationInterval.current);
            }
        }

        return () => {
            if (durationInterval.current) {
                clearInterval(durationInterval.current);
            }
        };
    }, [isTracking, isPaused]);

    useEffect(() => {
        return () => {
            if (locationSubscription.current) {
                locationSubscription.current.remove();
            }
            if (durationInterval.current) {
                clearInterval(durationInterval.current);
            }
        };
    }, []);

    const handleTogglePause = () => {
        if (isPaused) {
            resumeTracking();
        } else {
            pauseTracking();
        }
    };

    const { mutateAsync: postRun } = usePostRun();

    const { user } = useAuthStore();

    const handleEndRun = async () => {
        try {
            const runData = {
                distance,
                duration,
                pace,
                locations,
                userId: user?.id,
            };
            await postRun(runData);
            console.log('Run data posted successfully');
        } catch (error) {
            console.error('Error posting run data:', error);
        }
    }

    return (
        <>
            <Stack.Screen
                options={{
                    header: () => (<RunHeader />)
                }}
            />
            <View style={styles.container}>
                {location ? (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                    >
                        {locations.length > 1 && (
                            <Polyline
                                coordinates={locations}
                                strokeColor={Colors.primary}
                                strokeWidth={4}
                                lineCap="round"
                                lineJoin="round"
                            />
                        )}
                    </MapView>
                ) : (
                    <View style={[styles.map, styles.loadingContainer]}>
                        <Text>{errorMsg || 'Cargando ubicación...'}</Text>
                    </View>
                )}
                <View style={styles.bottomData}>
                    <SafeAreaView edges={['bottom']}>
                        <View style={styles.statsContainer}>
                            <StatItem
                                data={distance.toFixed(2)}
                                label="Distance (km)"
                                icon={<Ionicons name="map" size={24} color="black" />}
                            />
                            <StatItem
                                data={Math.floor(duration / 60).toString()}
                                label="Duration (min)"
                                icon={<Ionicons name="time-outline" size={24} color="black" />}
                            />
                            <StatItem
                                data={pace.toFixed(2)}
                                label="Pace (min/km)"
                                icon={<Ionicons name="flame" size={24} color="black" />}
                            />
                        </View>
                        <View style={styles.buttonContainer}>
                            <EndRunButton onClick={handleEndRun} />
                        </View>
                    </SafeAreaView>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    bottomData: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: defaultPadding,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 8,
    }
});

export default RunScreen;