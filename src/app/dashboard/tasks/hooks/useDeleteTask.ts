import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskService } from '@/services/task.service'

export const useDeleteTask = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete task', key],
		mutationFn: (id: string) => taskService.deleteTask(id),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	})

	return { deleteTask, isDeletePending }
}
