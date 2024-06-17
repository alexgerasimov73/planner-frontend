import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timerService } from '@/services/timer.service'

export function useCreateSession() {
	const queryClient = useQueryClient()

	const { isPending: isCreatePending, mutate: createSession } = useMutation({
		mutationKey: ['create new session'],
		mutationFn: () => timerService.createSessiion(),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['get today session'] })
	})
	return { isCreatePending, createSession }
}
