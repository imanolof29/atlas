import { useQuery } from "@tanstack/react-query"
import { Queries } from "../constants/Queries"
import { runService } from "../services/run.service"

export const useGetRuns = (userId: string) => {
    return useQuery({
        queryKey: [Queries.RUNS],
        queryFn: async () => await runService.getUserRuns(userId),
        enabled: !!userId,
    })
}