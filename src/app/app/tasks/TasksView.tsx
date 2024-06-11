'use client'

import { Loader } from '@/components/ui/Loader'

import { useLocalStorage } from '@/hooks/useLocalStorage'

import { SwitcherView } from './SwitcherView'
import ListView from './list-view/ListView'

export type TView = 'list' | 'kanban'

export default function TasksView() {
	const [isLoading, type, setType] = useLocalStorage<TView>({
		defaultValue: 'list',
		key: 'viiew-type'
	})

	if (isLoading) return <Loader />

	return (
		<div>
			<SwitcherView
				type={type}
				setType={setType}
			/>
			{type === 'list' ? <ListView /> : <ListView />}
		</div>
	)
}
