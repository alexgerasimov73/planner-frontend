import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { TTaskFormState } from '@/types/task.types'

import { taskService } from '@/services/task.service'

interface FunctionArguments {
	readonly id: string
	readonly data: TTaskFormState
}

export const useUpdateTask = (key?: string) => {
	const queryClient = useQueryClient()

	const { mutate: updateTask } = useMutation({
		mutationKey: ['update task', key],
		mutationFn: ({ id, data }: FunctionArguments) =>
			taskService.updateTask(id, data),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
	})

	return { updateTask }
}
