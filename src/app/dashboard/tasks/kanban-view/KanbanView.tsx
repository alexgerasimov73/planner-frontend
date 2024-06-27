'use client'

import { DragDropContext } from '@hello-pangea/dnd'

import { COLUMNS } from '../columns.data'
import { useTaskDnd } from '../hooks/useTaskDnd'
import { useTasks } from '../hooks/useTasks'

import KanbanColumn from './KanbanColumn'
import styles from './KanbanView.module.scss'

export default function KanbanView() {
	const { items, setItems } = useTasks()
	const { onDragEnd } = useTaskDnd()

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={styles.board}>
				{COLUMNS.map(column => (
					<KanbanColumn
						key={column.value}
						items={items}
						label={column.label}
						value={column.value}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	)
}