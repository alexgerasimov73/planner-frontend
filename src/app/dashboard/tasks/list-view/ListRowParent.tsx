import { Draggable, Droppable } from '@hello-pangea/dnd'
import type { Dispatch, SetStateAction } from 'react'

import type { ITaskResponse } from '@/types/task.types'

import { FILTERS } from '../columns.data'
import { filterTasks } from '../filter-tasks'

import ListAddRowInput from './ListAddRowInput'
import ListRow from './ListRow'
import styles from './ListView.module.scss'

interface IListRowParent {
	readonly items?: ReadonlyArray<ITaskResponse>
	readonly label: string
	readonly value: string
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export default function ListRowParent({
	items,
	label,
	value,
	setItems
}: IListRowParent) {
	const filteredList = filterTasks(value, items)

	return (
		<Droppable droppableId={value}>
			{provided => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={styles.colHeading}>
						<div className='w-full'>{label}</div>
					</div>

					{filteredList?.length
						? filteredList.map((item, index) => (
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
												item={item}
												setItems={setItems}
											/>
										</div>
									)}
								</Draggable>
							))
						: value !== 'completed' && (
								<p className={styles.emptyRow}>
									Looks like there are no tasks yet. Maybe it's time to create
									the first one by clicking on the "Add task" button?
								</p>
							)}

					{provided.placeholder}

					{value !== 'completed' && !items?.some(item => !item.id) && (
						<ListAddRowInput
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
							setItems={setItems}
						/>
					)}
				</div>
			)}
		</Droppable>
	)
}
