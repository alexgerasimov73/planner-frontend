import { Edit, GripVertical, Loader, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import type {
	ITimeBlockResponse,
	TTimeBlockFormState
} from '@/types/time-block.types'

import styles from './TimeBlocking.module.scss'
import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable'

interface ITimeBlock {
	readonly item: ITimeBlockResponse
}

export function TimeBlock({ item }: ITimeBlock) {
	const { attributes, listeners, style, setNodeRef } = useTimeBlockSortable(
		item.id
	)

	const { reset } = useFormContext<TTimeBlockFormState>()
	const { isDeletePending, deleteTimeBlock } = useDeleteTimeBlock(item.id)

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className={styles.block}
				style={{
					backgroundColor: item.color || 'lightgray',
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center text-white'>
					<button
						className={styles.grip}
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical />
					</button>
					<div>
						{item.name}{' '}
						<i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div className={styles.actions}>
					<button
						className='opacity-70 text-white transition-opacity hover:opacity-100 mr-2'
						onClick={() => {
							reset({
								id: item.id,
								color: item.color,
								duration: item.duration,
								name: item.name,
								order: item.order
							})
						}}
					>
						<Edit size={16} />
					</button>

					<button
						className='opacity-70 text-white transition-opacity hover:opacity-100'
						onClick={() => deleteTimeBlock()}
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	)
}
