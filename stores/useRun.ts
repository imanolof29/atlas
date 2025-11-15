import { create } from "zustand";
import * as Location from 'expo-location';

interface LocationCoords {
    latitude: number;
    longitude: number;
}

interface RunState {
    isTracking: boolean;
    isPaused: boolean;

    locations: LocationCoords[];
    duration: number;
    distance: number;
    pace: number;

    startTracking: () => void;
    pauseTracking: () => void;
    resumeTracking: () => void;
    stopTracking: () => void;
    addLocation: (location: Location.LocationObject) => void;
    incrementDuration: () => void;
    resetRun: () => void;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
};

export const useRunStore = create<RunState>((set, get) => ({
    isTracking: false,
    isPaused: false,
    locations: [],
    duration: 0,
    distance: 0,
    pace: 0,

    startTracking: () => {
        set({
            isTracking: true,
            isPaused: false,
            locations: [],
            duration: 0,
            distance: 0,
            pace: 0,
        });
    },

    pauseTracking: () => {
        set({ isPaused: true });
    },

    resumeTracking: () => {
        set({ isPaused: false });
    },

    stopTracking: () => {
        set({
            isTracking: false,
            isPaused: false,
        });
    },

    addLocation: (location: Location.LocationObject) => {
        const { locations, distance } = get();
        const newLocation = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };

        let newDistance = distance;

        if (locations.length > 0) {
            const lastLocation = locations[locations.length - 1];
            const incrementalDistance = calculateDistance(
                lastLocation.latitude,
                lastLocation.longitude,
                newLocation.latitude,
                newLocation.longitude
            );
            newDistance += incrementalDistance;
        }

        const { duration } = get();
        const newPace = newDistance > 0 ? (duration / 60) / newDistance : 0;

        set({
            locations: [...locations, newLocation],
            distance: newDistance,
            pace: newPace,
        });
    },

    incrementDuration: () => {
        const { duration, distance, isPaused } = get();

        if (isPaused) return;

        const newDuration = duration + 1;
        const newPace = distance > 0 ? (newDuration / 60) / distance : 0;

        set({
            duration: newDuration,
            pace: newPace,
        });
    },

    resetRun: () => {
        set({
            isTracking: false,
            isPaused: false,
            locations: [],
            duration: 0,
            distance: 0,
            pace: 0,
        });
    },
}));