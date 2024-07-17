import { PlusSquare } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { addTask } from '../utils/tasks.utils'

import styles from './ListView.module.scss'

interface IListAddRowInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export const ListAddRowInput = ({ filterDate, setItems }: IListAddRowInput) => (
	<div className={styles.addRow}>
		<button onClick={addTask(setItems, filterDate)}>
			<PlusSquare size={15} /> Add task
		</button>
	</div>
)
