import cn from 'clsx'
import { GripVertical, Loader, Trash } from 'lucide-react'
import type { Dispatch, SetStateAction } from 'react'
import { Controller, useForm } from 'react-hook-form'

import Checkbox from '@/components/ui/checkbox'
import { TransparentField } from '@/components/ui/fields/TransparentField'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'
import { DatePicker } from '@/components/ui/task-edit/date-picker/DatePicker'

import type { ITaskResponse, TTaskFormState } from '@/types/task.types'

import { useDeleteTask } from '../hooks/useDeleteTask'
import { useTaskDebounce } from '../hooks/useTaskDebounce'

import styles from './KanbanView.module.scss'

interface IKanbanCard {
	readonly item: ITaskResponse
	readonly setItems: Dispatch<
		SetStateAction<ReadonlyArray<ITaskResponse> | undefined>
	>
}

export default function KanbanCard({ item, setItems }: IKanbanCard) {
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
	return (
		<div
			className={cn(
				styles.card,
				{
					[styles.completed]: watch('isCompleted')
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
					name='isCompleted'
					render={({ field: { value, onChange } }) => (
						<Checkbox
							checked={value}
							onChange={onChange}
						/>
					)}
				/>

				<Controller
					control={control}
					name='createdAt'
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
					name='priority'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={['high', 'medium', 'low'].map(item => ({
								value: item,
								label: item
							}))}
							value={value || ''}
							onChange={onChange}
						/>
					)}
				/>
			</div>

			<div className={styles.cardActions}>
				<button
					className='opacity-50 transition-opacity hover:opacity-100'
					onClick={() =>
						item.id ? deleteTask(item.id) : setItems(prev => prev?.slice(0, -1))
					}
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	)
}
