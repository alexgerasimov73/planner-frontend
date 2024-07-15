import { useMutation, useQueryClient } from '@tanstack/react-query'

import { timerService } from '@/services/timer.service'

export const useDeleteSession = (onDeleteSuccess: () => void) => {
	const queryClient = useQueryClient()

	const { isPending: isDeletePending, mutate: deleteSession } = useMutation({
		mutationKey: ['delete the session'],
		mutationFn: (id: string) => timerService.deleteSession(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['get today session'] })
			onDeleteSuccess()
		}
	})

	return { isDeletePending, deleteSession }
}
