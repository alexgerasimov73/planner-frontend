import { PlusSquare } from 'lucide-react'
import { type Dispatch, type SetStateAction, memo } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { addTask } from '../utils/tasks.utils'

import styles from './KanbanView.module.scss'

interface Props {
	readonly column: string
	readonly filterDate?: string
	readonly setItems: Dispatch<SetStateAction<Record<string, ITaskResponse[]>>>
}

export const KanbanAddCardInput = memo(
	({ column, filterDate, setItems }: Props) => (
		<div className='mt-5'>
			<button
				className={styles.addCard}
				onClick={addTask(column, setItems, filterDate)}
			>
				<PlusSquare size={15} /> Add task
			</button>
		</div>
	)
)
