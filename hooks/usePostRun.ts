import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Queries } from "../constants/Queries"
import { runService } from "../services/run.service"

export const usePostRun = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: [Queries.RUNS],
        mutationFn: async (runData: any) => await runService.postRun(runData),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: [Queries.RUNS] }),
    })
}