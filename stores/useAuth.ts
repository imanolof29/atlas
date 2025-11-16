import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { Session, User, AuthTokenResponsePassword } from "@supabase/supabase-js";
import * as AppleAuthentication from 'expo-apple-authentication';
import { Alert } from "react-native";

interface AuthState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    initialize: () => Promise<void>;
    signInWithApple: (credential: AppleAuthentication.AppleAuthenticationCredential) => Promise<AuthTokenResponsePassword>;
    signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    session: null,
    isLoading: true,

    initialize: async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            set({
                user: session?.user ?? null,
                session: session ?? null,
                isLoading: false
            });
        } catch (error) {
            console.error('Error initializing auth:', error);
            set({ isLoading: false });
        }
    },

    signInWithApple: async (credentials: AppleAuthentication.AppleAuthenticationCredential) => {
        console.log('🍎 Credentials received:', {
            email: credentials.email,
            user: credentials.user,
            fullName: credentials.fullName
        });

        // ⚠️ TEMPORAL: Si no hay email, mostrar alerta
        if (!credentials.email) {
            console.warn('⚠️ Apple no proporcionó email. Necesitas revocar el acceso primero.');
            Alert.alert(
                'Autenticación requerida',
                'Para continuar, debes revocar el acceso de esta app en Ajustes → Apple ID → Contraseña y seguridad → Apps usando Apple ID',
                [{ text: 'Entendido' }]
            );
            throw new Error('Email not provided by Apple');
        }

        const options: any = {
            provider: 'apple',
            token: credentials.identityToken!,
        };

        if (credentials.email || credentials.fullName) {
            options.options = {
                data: {}
            };

            if (credentials.email) {
                options.options.data.email = credentials.email;
            }

            if (credentials.fullName?.givenName || credentials.fullName?.familyName) {
                options.options.data.full_name =
                    `${credentials.fullName.givenName || ''} ${credentials.fullName.familyName || ''}`.trim();
            }
        }

        const { data, error } = await supabase.auth.signInWithIdToken(options);

        if (error) throw error;

        set({
            user: data.user ?? null,
            session: data.session ?? null
        });

        return { data, error };
    },

    signOut: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
    }
}));