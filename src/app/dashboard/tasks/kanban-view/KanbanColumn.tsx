import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { Dispatch, SetStateAction } from 'react'

import { COMPLETED } from '@/constants/common.constants'

import type { ITaskResponse } from '@/types/task.types'

import { getFilteredDate } from '../utils/tasks.utils'

import { KanbanAddCardInput } from './KanbanAddCardInput'
import { KanbanCard } from './KanbanCard'
import styles from './KanbanView.module.scss'

interface IKanbanColumn {
	readonly items: ReadonlyArray<ITaskResponse>
	readonly label: string
	readonly value: string
	readonly setItems: Dispatch<SetStateAction<Record<string, ITaskResponse[]>>>
}

export const KanbanColumn = ({
	items,
	label,
	value,
	setItems
}: IKanbanColumn) => (
	<Droppable droppableId={value}>
		{provided => (
			<div
				ref={provided.innerRef}
				{...provided.droppableProps}
			>
				<div className={styles.column}>
					<div>{label}</div>

					{items.map((item, index) => (
						<Draggable
							key={item.id}
							draggableId={item.id}
							index={index}
						>
							{provided => (
								<div
									ref={provided.innerRef}
									{...provided.draggableProps}
									{...provided.dragHandleProps}
								>
									<KanbanCard
										key={item.id}
										column={value}
										item={item}
										setItems={setItems}
									/>
								</div>
							)}
						</Draggable>
					))}

					{provided.placeholder}

					{value !== COMPLETED && !items.some(item => !item.id) && (
						<KanbanAddCardInput
							column={value}
							filterDate={getFilteredDate(value)}
							setItems={setItems}
						/>
					)}
				</div>
			</div>
		)}
	</Droppable>
)
