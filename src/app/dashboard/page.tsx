import { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/common.constants'

import Statistics from './Statistics'

export const metadata: Metadata = {
	title: 'Dashboard',
	...NO_INDEX_PAGE
}

export default function DashboardPage() {
	return <Statistics />
}
