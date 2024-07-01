import { PlusSquare } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import styles from './ListView.module.scss'

interface IListAddRowInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export default function ListAddRowInput({
	filterDate,
	setItems
}: IListAddRowInput) {
	const addRow = () => {
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
		<div className={styles.addRow}>
			<button
				className='flex items-center gap-2 border rounded-lg border-primary py-2 px-3 italic text-sm hover:border-secondary hover:text-secondary active:border-secondary/75'
				onClick={addRow}
			>
				<PlusSquare size={15} /> Add task
			</button>
		</div>
	)
}
