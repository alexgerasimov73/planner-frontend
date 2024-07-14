import type { DropResult } from '@hello-pangea/dnd'

import { COMPLETED } from '@/constants/common.constants'

import { FILTERS } from '../utils/tasks.utils'

import { useUpdateTask } from './useUpdateTask'

export const useTaskDnd = () => {
	const { updateTask } = useUpdateTask()

	const onDragEnd = (result: DropResult) => {
		if (!result.destination) return

		const destinationColumnId = result.destination.droppableId

		if (destinationColumnId === result.source.droppableId) return

		if (destinationColumnId === COMPLETED) {
			updateTask({
				id: result.draggableId,
				data: {
					isCompleted: true
				}
			})
			return
		}

		const newCreatedAt = FILTERS[destinationColumnId].format()
		updateTask({
			id: result.draggableId,
			data: {
				createdAt: newCreatedAt,
				isCompleted: false
			}
		})
	}

	return { onDragEnd }
}
