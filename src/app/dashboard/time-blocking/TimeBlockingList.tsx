import { DndContext, closestCenter } from '@dnd-kit/core'
import {
	restrictToParentElement,
	restrictToVerticalAxis
} from '@dnd-kit/modifiers'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'

import { Loader } from '@/components/ui/Loader'

import { calcHoursLeft } from '@/utils/common.utils'

import { TimeBlock } from './TimeBlock'
import { useTimeBlockDnD } from './hooks/useTimeBlockDnD'
import { useTimeBlocks } from './hooks/useTimeBlocks'

export const TimeBlockingList = () => {
	const { isLoading, items, setItems } = useTimeBlocks()
	const { sensors, handleDragEnd } = useTimeBlockDnD({ items, setItems })

	const hoursLeft = calcHoursLeft(items)

	return isLoading ? (
		<Loader />
	) : (
		<div>
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToVerticalAxis, restrictToParentElement]}
				sensors={sensors}
				onDragEnd={handleDragEnd}
			>
				<div>
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items.map(item => (
								<TimeBlock
									key={item.id}
									item={item}
								/>
							))
						) : (
							<div>Add the first time-block on the right</div>
						)}
					</SortableContext>
				</div>
			</DndContext>

			{!!items?.length && (
				<div>
					{hoursLeft > 0
						? `${hoursLeft} hours out of 24 left for sleep`
						: 'No hours left to sleep'}
				</div>
			)}
		</div>
	)
}
