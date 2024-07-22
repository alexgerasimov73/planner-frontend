'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { TASKS_COLUMNS } from '@/constants/common.constants'

import { useTaskDnd } from '../hooks/useTaskDnd'
import { useTasks } from '../hooks/useTasks'

import { ListRowParent } from './ListRowParent'
import styles from './ListView.module.scss'

export const ListView = () => {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.table}>
				<div className={styles.header}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>

				<div className={styles.parentsWrapper}>
					{TASKS_COLUMNS.map(column => (
						<ListRowParent
							key={column.value}
							items={items[column.value]}
							label={column.label}
							value={column.value}
							setItems={setItems}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	)
}
