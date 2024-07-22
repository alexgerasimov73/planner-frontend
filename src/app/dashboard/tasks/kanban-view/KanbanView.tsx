'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { TASKS_COLUMNS } from '@/constants/common.constants'

import { useTaskDnd } from '../hooks/useTaskDnd'
import { useTasks } from '../hooks/useTasks'

import { KanbanColumn } from './KanbanColumn'
import styles from './KanbanView.module.scss'

export const KanbanView = () => {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{TASKS_COLUMNS.map(column => (
					<KanbanColumn
						key={column.value}
						items={items[column.value]}
						label={column.label}
						value={column.value}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}
