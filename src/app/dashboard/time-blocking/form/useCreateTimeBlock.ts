import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TTimeBlockFormState } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

export function useCreateTimeBlock() {
	const queryClient = useQueryClient()

	const { isPending: isCreatePending, mutate: createTimeBlock } = useMutation({
		mutationKey: ['create new time-block'],
		mutationFn: (data: TTimeBlockFormState) =>
			timeBlockService.createTimeBlock(data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
	})
	return { isCreatePending, createTimeBlock }
}
