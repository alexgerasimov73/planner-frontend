import { Edit, GripVertical, Loader, Trash } from 'lucide-react'
import { useFormContext } from 'react-hook-form'

import { TIME_BLOCKING_COLORS } from '@/constants/common.constants'

import type {
	ITimeBlockResponse,
	TTimeBlockFormState
} from '@/types/time-block.types'

import { useDeleteTimeBlock } from './hooks/useDeleteTimeBlock'
import { useTimeBlockSortable } from './hooks/useTimeBlockSortable'

interface ITimeBlock {
	readonly item: ITimeBlockResponse
}

export const TimeBlock = ({ item }: ITimeBlock) => {
	const { attributes, listeners, style, setNodeRef } = useTimeBlockSortable(
		item.id
	)

	const { reset } = useFormContext<TTimeBlockFormState>()
	const { isDeletePending, deleteTimeBlock } = useDeleteTimeBlock(item.id)

	const handleEditTimeBlock = () =>
		reset({
			id: item.id,
			color: item.color,
			duration: item.duration,
			name: item.name,
			order: item.order
		})

	const handleDeleteTimeBlock = () => deleteTimeBlock()

	return (
		<div
			ref={setNodeRef}
			style={style}
		>
			<div
				className='relative flex items-center justify-between mb-3 p-4 rounded text-sm'
				style={{
					backgroundColor: item.color || TIME_BLOCKING_COLORS.at(-1),
					height: `${item.duration}px`
				}}
			>
				<div className='flex items-center text-white'>
					<button
						className='-ml-1 mr-0.5 transition-opacity hover:opacity-50 active:opacity-50'
						{...attributes}
						{...listeners}
						aria-describedby='time-block'
					>
						<GripVertical />
					</button>

					<div>
						{item.name}&nbsp;
						<i className='text-xs opacity-50'>({item.duration} min.)</i>
					</div>
				</div>

				<div>
					<button
						className='mr-2 opacity-70 text-white transition-opacity hover:opacity-100'
						onClick={handleEditTimeBlock}
					>
						<Edit size={16} />
					</button>

					<button
						className='opacity-70 text-white transition-opacity hover:opacity-100'
						onClick={handleDeleteTimeBlock}
					>
						{isDeletePending ? <Loader size={16} /> : <Trash size={16} />}
					</button>
				</div>
			</div>
		</div>
	)
}
