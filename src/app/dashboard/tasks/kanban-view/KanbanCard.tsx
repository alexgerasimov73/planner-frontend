import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { Checkbox } from '@/components/ui/checkbox/Checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import {
	CREATED_AT,
	IS_COMPLETED,
	PRIORITY
} from '@/constants/common.constants'

import type { ITaskResponse, TTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'
import { dataForTaskSelect } from '../utils/tasks.utils'

import styles from './KanbanView.module.scss'

interface IKanbanCard {
	readonly item: ITaskResponse
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export const KanbanCard = ({ item, setItems }: IKanbanCard) => {
	const { control, register, watch } = useForm<TTaskFormState>({
		defaultValues: {
			createdAt: item.createdAt,
			isCompleted: item.isCompleted,
			name: item.name,
			priority: item.priority
		}
	})

	const { deleteTask, isDeletePending } = useDeleteTask()

	useTaskDebounce({ itemId: item.id, watch })

	const handleDeleteTask = () =>
		item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))

	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.completed]: watch(IS_COMPLETED)
				},
				'animation-opacity'
			)}
		>
			<div className={styles.cardHeader}>
				<button
					className={styles.grip}
					aria-describedby='todo-item'
				>
					<GripVertical />
				</button>

				<Controller
					control={control}
					name={IS_COMPLETED}
					render={({ field: { value, onChange } }) => (
						<Checkbox
							checked={value}
							onChange={onChange}
						/>
					)}
				/>

				<Controller
					control={control}
					name={CREATED_AT}
					render={({ field: { value, onChange } }) => (
						<DatePicker
							position='left'
							value={value || ''}
							onChange={onChange}
						/>
					)}
				/>
			</div>

			<div className={styles.cardBody}>
				<TransparentField
					className='mb-3'
					placeholder='Type the name of the task here...'
					{...register('name')}
				/>

				<Controller
					control={control}
					name={PRIORITY}
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={dataForTaskSelect}
							value={value || ''}
							onChange={onChange}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					className='opacity-50 transition-opacity hover:opacity-100'
					onClick={handleDeleteTask}
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
