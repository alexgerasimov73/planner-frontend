import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TTimerSessionState } from '@/types/timer.types'

import { timerService } from '@/services/timer.service'

interface MutationFunctionInterface {
	readonly id: string
	readonly data: TTimerSessionState
}
export function useUpdateRound() {
	const queryClient = useQueryClient()

	const { isPending: isUpdateRoundPending, mutate: updateRound } = useMutation({
		mutationKey: ['update round'],
		mutationFn: ({ id, data }: MutationFunctionInterface) =>
			timerService.updateRound(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['get today session'] })
	})
	return { isUpdateRoundPending, updateRound }
}
