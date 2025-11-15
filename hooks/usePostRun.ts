import { useMutation } from "@tanstack/react-query"
import { Queries } from "../constants/Queries"
import { runService } from "../services/run.service"

export const usePostRun = () => {
    return useMutation({
        mutationKey: [Queries.RUNS],
        mutationFn: async (runData: any) => await runService.postRun(runData),
    })
}