'use client'

import { Loader } from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { SwitcherView } from './SwitcherView'
import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'

export type TView = 'list' | 'kanban'

export default function TasksView() {
	const { isLoading, type, setType } = useLocalStorage<TView>({
		defaultValue: 'list',
		key: 'view-type'
	})

	if (isLoading) return <Loader />

	return (
		<>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === 'list' ? <ListView /> : <KanbanView />}
		</>
	)
}
