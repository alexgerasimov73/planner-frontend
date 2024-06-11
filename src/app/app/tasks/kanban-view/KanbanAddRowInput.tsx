import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import styles from './KanbanView.module.scss'

interface IKanbanAddRowInput {
	readonly filterDate?: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export default function KanbanAddRowInput({
	filterDate,
	setItems
}: IKanbanAddRowInput) {
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
				className='italic opacity-40 text-sm'
				onClick={addRow}
			>
				Add task...
			</button>
		</div>
	)
}
