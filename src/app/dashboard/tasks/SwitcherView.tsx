import cn from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'

import { TasksRepresentation } from '@/types/common.types'

interface ISwitcherView {
	readonly type: TasksRepresentation
	readonly setType: (value: TasksRepresentation) => void
}

export const SwitcherView = ({ type, setType }: ISwitcherView) => {
	const handleSwitchType = (type: TasksRepresentation) => () => setType(type)

	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === TasksRepresentation.kanban
				})}
				onClick={handleSwitchType(TasksRepresentation.list)}
			>
				<ListTodo />
				List
			</button>

			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === TasksRepresentation.list
				})}
				onClick={handleSwitchType(TasksRepresentation.kanban)}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
