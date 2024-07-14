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
		<button
			className='flex items-center gap-2 border rounded-lg border-primary py-2 px-3 italic text-sm hover:border-secondary hover:text-secondary active:border-secondary/75'
			onClick={addTask(setItems, filterDate)}
		>
			<PlusSquare size={15} /> Add task
		</button>
	</div>
)
