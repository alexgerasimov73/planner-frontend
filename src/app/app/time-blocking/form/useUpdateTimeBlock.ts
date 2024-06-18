import { useMutation, useQueryClient } from '@tanstack/react-query'

import { TTimeBlockFormState } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

interface FunctionArguments {
	readonly id: string
	readonly data: TTimeBlockFormState
}

export function useUpdateTimeBlock(key?: string) {
	const queryClient = useQueryClient()

	const { mutate: updataTimeBlock } = useMutation({
		mutationKey: ['update time-block', key],
		mutationFn: ({ id, data }: FunctionArguments) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
	})
	return { updataTimeBlock }
}
