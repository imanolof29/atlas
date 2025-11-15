import { View, Image } from "react-native"

type Props = {
    uri: string
}

export const ProfilePicture = ({ uri }: Props) => {
    return (
        <View>
            <Image
                source={{ uri }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
            />
        </View>
    )
}