import { useMutation } from "@tanstack/react-query"
import { Queries } from "../constants/Queries"
import { usersService } from "../services/users.service"

type Props = {
    filePath: string;
    buffer: ArrayBuffer;
    contentType: string;
}

export const useUploadProfileImage = () => {
    return useMutation({
        mutationKey: [Queries.USERS],
        mutationFn: async ({ filePath, buffer, contentType }: Props) => await usersService.uploadProfileImage(filePath, buffer, contentType),
    })
}