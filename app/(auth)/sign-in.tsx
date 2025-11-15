import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppleAuthenticationButton } from "expo-apple-authentication";
import * as AppleAuthentication from 'expo-apple-authentication';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from "../../stores/useAuth";

const SignInScreen = () => {

    const { signInWithApple } = useAuthStore();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.headerSection}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="location" size={48} color="#fff" />
                    </View>
                    <Text style={styles.appName}>Atlas</Text>
                    <Text style={styles.tagline}>
                        Corre, conquista territorio y domina tu ciudad
                    </Text>
                </View>

                <View style={styles.featuresContainer}>
                    <View style={styles.featureCard}>
                        <View style={[styles.featureIcon, { backgroundColor: '#DCFCE7' }]}>
                            <Ionicons name="location" size={24} color="#10B981" />
                        </View>
                        <Text style={styles.featureLabel}>Zonas</Text>
                    </View>

                    <View style={styles.featureCard}>
                        <View style={[styles.featureIcon, { backgroundColor: '#FEE2E2' }]}>
                            <Ionicons name="trophy" size={24} color="#EF4444" />
                        </View>
                        <Text style={styles.featureLabel}>Rankings</Text>
                    </View>

                    <View style={styles.featureCard}>
                        <View style={[styles.featureIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Ionicons name="flame" size={24} color="#F59E0B" />
                        </View>
                        <Text style={styles.featureLabel}>Desafíos</Text>
                    </View>
                </View>

                <View style={styles.authCard}>
                    <Text style={styles.authTitle}>Comienza tu conquista</Text>
                    <Text style={styles.authSubtitle}>
                        Únete a miles de corredores conquistando sus ciudades
                    </Text>

                    <View style={styles.authButtons}>
                        <TouchableOpacity style={styles.googleButton}>
                            <Ionicons name="logo-google" size={20} color="#000" />
                            <Text style={styles.googleButtonText}>Continuar con Google</Text>
                        </TouchableOpacity>

                        <AppleAuthenticationButton
                            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                            cornerRadius={12}
                            style={styles.appleButton}
                            onPress={async () => {
                                try {
                                    const credential = await AppleAuthentication.signInAsync({
                                        requestedScopes: [
                                            AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                                            AppleAuthentication.AppleAuthenticationScope.EMAIL,
                                        ],
                                    });

                                    if (credential.identityToken) {
                                        await signInWithApple(credential.identityToken);
                                    } else {
                                        console.error('No identity token returned from Apple Sign-In');
                                    }
                                } catch (error) {
                                    console.error('Error during Apple Sign-In:', error);
                                }
                            }}
                        />
                    </View>

                    <Text style={styles.termsText}>
                        Al continuar, aceptas nuestros{' '}
                        <Text style={styles.termsLink}>Términos de Servicio</Text>
                        {' '}y{' '}
                        <Text style={styles.termsLink}>Política de Privacidad</Text>
                    </Text>
                </View>

                <View style={styles.infoSection}>
                    <View style={styles.infoItem}>
                        <View style={[styles.infoIcon, { backgroundColor: '#DCFCE7' }]}>
                            <Ionicons name="location" size={20} color="#10B981" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTitle}>Conquista zonas</Text>
                            <Text style={styles.infoDescription}>
                                Cada carrera expande tu territorio
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={[styles.infoIcon, { backgroundColor: '#FEE2E2' }]}>
                            <Ionicons name="trophy" size={20} color="#EF4444" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTitle}>Compite globalmente</Text>
                            <Text style={styles.infoDescription}>
                                Rankings y desafíos semanales
                            </Text>
                        </View>
                    </View>

                    <View style={styles.infoItem}>
                        <View style={[styles.infoIcon, { backgroundColor: '#FEF3C7' }]}>
                            <Ionicons name="flame" size={20} color="#F59E0B" />
                        </View>
                        <View style={styles.infoTextContainer}>
                            <Text style={styles.infoTitle}>Mantén la racha</Text>
                            <Text style={styles.infoDescription}>
                                Corre diario y gana recompensas
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFAFA',
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 32,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: 20,
        backgroundColor: '#10B981',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#10B981',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    appName: {
        fontSize: 32,
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: 8,
    },
    tagline: {
        fontSize: 15,
        color: '#6B7280',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    featuresContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
        gap: 12,
    },
    featureCard: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: '#374151',
    },
    authCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    authTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1F2937',
        textAlign: 'center',
        marginBottom: 8,
    },
    authSubtitle: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20,
    },
    authButtons: {
        gap: 12,
        marginBottom: 16,
    },
    googleButton: {
        height: 52,
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    googleButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
    },
    appleButton: {
        height: 52,
    },
    termsText: {
        fontSize: 12,
        color: '#9CA3AF',
        textAlign: 'center',
        lineHeight: 18,
    },
    termsLink: {
        color: '#10B981',
        textDecorationLine: 'underline',
    },
    infoSection: {
        gap: 16,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    infoIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoTextContainer: {
        flex: 1,
    },
    infoTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1F2937',
        marginBottom: 2,
    },
    infoDescription: {
        fontSize: 13,
        color: '#6B7280',
    },
});

export default SignInScreen;