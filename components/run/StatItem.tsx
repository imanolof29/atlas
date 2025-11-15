import { View, Text, StyleSheet } from "react-native";

type Props = {
    data: string;
    label: string;
    icon: React.ReactNode;
}

export const StatItem = ({ data, label, icon }: Props) => {
    return (
        <View style={styles.container}>
            {icon}
            <Text style={styles.data}>{data}</Text>
            <Text style={styles.label}>{label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    data: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 14,
        color: 'gray'
    }
})