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
				className='italic opacity-40 text-sm'
				onClick={addRow}
			>
				Add task...
			</button>
		</div>
	)
}
