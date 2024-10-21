import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { Dispatch, SetStateAction } from 'react'

import { COMPLETED } from '@/constants/common.constants'

import type { ITaskResponse } from '@/types/task.types'

import { getFilteredDate } from '../utils/tasks.utils'

import { ListAddRowInput } from './ListAddRowInput'
import { ListRow } from './ListRow'
import styles from './ListView.module.scss'

interface Props {
	readonly items: ReadonlyArray<ITaskResponse>
	readonly label: string
	readonly value: string
	readonly setItems: Dispatch<SetStateAction<Record<string, ITaskResponse[]>>>
}

export const ListRowParent = ({ items, label, value, setItems }: Props) => (
	<Droppable droppableId={value}>
		{provided => (
			<div
				ref={provided.innerRef}
				{...provided.droppableProps}
			>
				<div className={styles.colHeading}>
					<div>{label}</div>
				</div>

				{items.length
					? items.map((item, index) => (
							<Draggable
								key={item.id}
								draggableId={item.id || String(index)}
								index={index}
							>
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ListRow
											key={item.id}
											column={value}
											item={item}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))
					: value !== COMPLETED && (
							<p className={styles.emptyRow}>
								Looks like there are no tasks yet. Maybe it's time to create the
								first one by clicking on the "Add task" button?
							</p>
						)}

				{provided.placeholder}

				{value !== COMPLETED && !items.some(item => !item.id) && (
					<ListAddRowInput
						column={value}
						filterDate={getFilteredDate(value)}
						setItems={setItems}
					/>
				)}
			</div>
		)}
	</Droppable>
)
