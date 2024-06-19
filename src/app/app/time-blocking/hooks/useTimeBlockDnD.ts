import {
	DragEndEvent,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors
} from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction } from 'react'

import { ITimeBlockResponse } from '@/types/time-block.types'

import { timeBlockService } from '@/services/time-block.service'

interface IUseTimeBlockDnD {
	readonly items?: ReadonlyArray<ITimeBlockResponse>
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITimeBlockResponse> | undefined>
	>
}

export function useTimeBlockDnD({ items, setItems }: IUseTimeBlockDnD) {
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor)
	)
	const queryClient = useQueryClient()

	const { mutate } = useMutation({
		mutationKey: ['update order time block'],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlocks(ids),
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['time-blocks'] })
	})

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event

		if (items && active.id !== over?.id) {
			const oldIndex = items.findIndex(item => item.id === active.id)
			const newIndex = items.findIndex(item => item.id === (over?.id || ''))

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove([...items], oldIndex, newIndex)
				setItems(newItems)
				mutate(newItems.map(item => item.id))
			}
		}
	}

	return { sensors, handleDragEnd }
}
