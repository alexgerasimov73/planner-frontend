'use client'

import cn from 'clsx'
import { Kanban, ListTodo } from 'lucide-react'

import type { TView } from './TasksView'

interface ISwitcherView {
	readonly type: TView
	readonly setType: (value: TView) => void
}

export function SwitcherView({ type, setType }: ISwitcherView) {
	return (
		<div className='flex items-center gap-4 mb-5'>
			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'kanban'
				})}
				onClick={() => setType('list')}
			>
				<ListTodo />
				List
			</button>

			<button
				className={cn('flex items-center gap-1', {
					'opacity-40': type === 'list'
				})}
				onClick={() => setType('kanban')}
			>
				<Kanban />
				Board
			</button>
		</div>
	)
}
