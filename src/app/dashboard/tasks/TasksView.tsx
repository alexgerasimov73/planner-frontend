'use client'

import { Loader } from '@/components/ui/Loader'

import { VIEW_TYPE } from '@/constants/common.constants'

import { TasksRepresentation } from '@/types/common.types'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { SwitcherView } from './SwitcherView'
import { KanbanView } from './kanban-view/KanbanView'
import { ListView } from './list-view/ListView'

export const TasksView = () => {
	const { isLoading, type, setType } = useLocalStorage<TasksRepresentation>({
		defaultValue: TasksRepresentation.list,
		key: VIEW_TYPE
	})

	return isLoading ? (
		<Loader />
	) : (
		<>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === TasksRepresentation.list ? <ListView /> : <KanbanView />}
		</>
	)
}
