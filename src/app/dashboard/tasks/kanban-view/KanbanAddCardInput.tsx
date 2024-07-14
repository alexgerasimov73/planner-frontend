import { PlusSquare } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { addTask } from '../utils/tasks.utils'

interface IKanbanAddCardInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export const KanbanAddCardInput = ({
	filterDate,
	setItems
}: IKanbanAddCardInput) => (
	<div className='mt-5'>
		<button
			className='flex items-center gap-2 py-2 px-3 border rounded-lg border-primary italic text-sm hover:border-secondary hover:text-secondary active:border-secondary/75'
			onClick={addTask(setItems, filterDate)}
		>
			<PlusSquare size={15} /> Add task
		</button>
	</div>
)
