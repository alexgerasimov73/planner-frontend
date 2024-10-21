import cn from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'

import { TasksRepresentation } from '@/types/common.types'

interface Props {
	readonly type: TasksRepresentation
	readonly setType: (value: TasksRepresentation) => void
}

export const SwitcherView = ({ type, setType }: Props) => {
	const handleSwitchType = (type: TasksRepresentation) => () => setType(type)

	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn(
					'relative flex-center gap-1 before:absolute before:-bottom-1 before:h-1 before:w-full before:bg-orange before:transition-transform before:origin-left',
					{
						'opacity-40 before:scale-x-0 hover:before:scale-x-100':
							type === TasksRepresentation.kanban
					}
				)}
				onClick={handleSwitchType(TasksRepresentation.list)}
			>
				<ListTodo />
				List
			</button>

			<button
				className={cn(
					'relative flex-center gap-1 before:absolute before:-bottom-1 before:h-1 before:w-full before:bg-blue before:transition-transform before:origin-left',
					{
						'opacity-40 before:scale-x-0 hover:before:scale-x-100':
							type === TasksRepresentation.list
					}
				)}
				onClick={handleSwitchType(TasksRepresentation.kanban)}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
