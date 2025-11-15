import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native"
import { ProfilePicture } from "../../components/profile/ProfilePicture";
import { Colors } from "../../constants/Colors";
import { defaultPadding } from "../../constants/Size";
import { useAuthStore } from "../../stores/useAuth";

const uri = "https://media.gettyimages.com/id/2245985254/pt/foto/bilbao-spain-gorka-guruzeta-of-athletic-club-reacts-during-the-laliga-ea-sports-match-between.jpg?s=2048x2048&w=gi&k=20&c=xXlPZtUbJphhzUqydnQQTY_LqXBPUpcjN-klRUCQbIw="

const ProfileScreen = () => {

    const { signOut } = useAuthStore();

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <ProfilePicture uri={uri} />
                <Text style={styles.username}>@runner_pro</Text>
                <Text style={styles.memberSince}>Miembro desde Noviembre 2025</Text>
            </View>

            <View style={styles.statsContainer}>
                <Text style={styles.sectionTitle}>Estadísticas</Text>

                <View style={styles.statCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Total Kilómetros</Text>
                        <Text style={styles.statValue}>247.8 KM</Text>
                    </View>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Carreras Completadas</Text>
                        <Text style={styles.statValue}>58</Text>
                    </View>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Tiempo Total</Text>
                        <Text style={styles.statValue}>21h 45m</Text>
                    </View>
                </View>

                <View style={styles.statCard}>
                    <View style={styles.statRow}>
                        <Text style={styles.statLabel}>Ritmo Medio</Text>
                        <Text style={styles.statValue}>4:32 min/km</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={signOut}>
                <Text>Cerrar sesion</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        backgroundColor: '#FFFFFF',
        paddingTop: 40,
        paddingBottom: 24,
        paddingHorizontal: 16,
        alignItems: 'center',
        gap: 12,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
    },
    username: {
        fontSize: 24,
        fontWeight: '700',
        color: '#1A1A1A',
        marginTop: 8,
    },
    memberSince: {
        fontSize: 14,
        color: '#666666',
        fontWeight: '400',
    },
    statsContainer: {
        padding: defaultPadding,
        gap: 12,
        marginTop: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A1A1A',
        marginBottom: 4,
        marginLeft: 4,
    },
    statCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    statRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    statLabel: {
        fontSize: 16,
        color: '#666666',
        fontWeight: '500',
    },
    statValue: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.primary,
    },
})

export default ProfileScreen;