import { create } from "zustand";
import { supabase } from "../lib/supabase";
import { Session, User, AuthTokenResponsePassword } from "@supabase/supabase-js";

interface AuthState {
    user: User | null;
    session: Session | null;
    isLoading: boolean;
    initialize: () => Promise<void>;
    signInWithApple: (token: string) => Promise<AuthTokenResponsePassword>;
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

    signInWithApple: async (token: string) => {
        const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'apple',
            token
        });

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