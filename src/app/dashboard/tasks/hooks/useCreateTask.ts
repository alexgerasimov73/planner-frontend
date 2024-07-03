import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TTaskFormState } from '@/types/task.types'

import { taskService } from '@/services/task.service'

export function useCreateTask(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: createTask } = useMutation({
		mutationKey: ['create task', key],
		mutationFn: (data: TTaskFormState) => taskService.createTask(data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	})
	return { createTask }
}
