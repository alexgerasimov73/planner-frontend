import { PlusSquare } from 'lucide-react'
import { type Dispatch, type SetStateAction, memo } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { addTask } from '../utils/tasks.utils'

import styles from './KanbanView.module.scss'

interface IKanbanAddCardInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export const KanbanAddCardInput = memo(
	({ filterDate, setItems }: IKanbanAddCardInput) => (
		<div className='mt-5'>
			<button
				className={styles.addCard}
				onClick={addTask(setItems, filterDate)}
			>
				<PlusSquare size={15} /> Add task
			</button>
		</div>
	)
)
