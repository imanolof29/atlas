import { useAuthStore } from "../stores/useAuth";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout() {

    const { initialize, isLoading, user } = useAuthStore();

    useEffect(() => {
        initialize();
    }, [initialize]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <QueryClientProvider client={queryClient}>
            <StatusBar style="auto" />
            <Stack>
                <Stack.Protected guard={!!user}>
                    <Stack.Screen options={{ headerShown: false }} name="(tabs)" />
                </Stack.Protected>
                <Stack.Protected guard={!user}>
                    <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>
        </QueryClientProvider>
    )
}