import { PlusSquare } from 'lucide-react'
import { type Dispatch, type SetStateAction, memo } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { addTask } from '../utils/tasks.utils'

import styles from './ListView.module.scss'

interface Props {
	readonly column: string
	readonly filterDate?: string
	readonly setItems: Dispatch<SetStateAction<Record<string, ITaskResponse[]>>>
}

export const ListAddRowInput = memo(
	({ column, filterDate, setItems }: Props) => (
		<div className={styles.addRow}>
			<button onClick={addTask(column, setItems, filterDate)}>
				<PlusSquare size={15} /> Add task
			</button>
		</div>
	)
)
