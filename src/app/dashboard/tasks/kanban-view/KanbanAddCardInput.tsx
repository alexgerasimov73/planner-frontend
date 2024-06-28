import { PlusSquare } from 'lucide-react'
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
				className='flex items-center gap-2 border rounded-lg border-primary py-2 px-3 italic text-sm hover:border-secondary hover:text-secondary active:border-secondary/75'
				onClick={addCard}
			>
				<PlusSquare size={15} /> Add task
			</button>
		</div>
	)
}
