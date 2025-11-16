import { useQuery } from "@tanstack/react-query"
import { usersService } from "../services/users.service"
import { Queries } from "../constants/Queries"

export const useGetUserStats = () => {
    return useQuery({
        queryKey: [Queries.STATS],
        queryFn: async () => await usersService.getUserStats(),
    })
}