'use client'

import { Loader } from '@/components/ui/Loader'

import { TasksRepresentation } from '@/types/common.types'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { SwitcherView } from './SwitcherView'
import KanbanView from './kanban-view/KanbanView'
import ListView from './list-view/ListView'

export default function TasksView() {
	const { isLoading, type, setType } = useLocalStorage<TasksRepresentation>({
		defaultValue: TasksRepresentation.list,
		key: 'view-type'
	})

	if (isLoading) return <Loader />

	return (
		<>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === TasksRepresentation.list ? <ListView /> : <KanbanView />}
		</>
	)
}
