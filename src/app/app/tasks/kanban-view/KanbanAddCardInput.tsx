import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

interface IKanbanAddCardInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export default function KanbanAddCardInput({
	filterDate,
	setItems
}: IKanbanAddCardInput) {
	const addCard = () => {
		setItems(prev => {
			if (!prev) return

			return [
				...prev,
				{
					id: '',
					name: '',
					isCompleted: false,
					createdAt: filterDate
				}
			]
		})
	}
	return (
		<div className='mt-5'>
			<button
				className='italic opacity-40 text-sm'
				onClick={addCard}
			>
				Add task...
			</button>
		</div>
	)
}
