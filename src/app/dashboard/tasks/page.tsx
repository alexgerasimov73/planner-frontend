import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/common.constants'

import { TasksView } from './TasksView'

export const metadata: Metadata = {
	title: 'Tasks',
	...NO_INDEX_PAGE
}

export default function TasksPage() {
	return <TasksView />
}
