import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/common.constants'

import { Timer } from './Timer'

export const metadata: Metadata = {
	title: 'Timer',
	...NO_INDEX_PAGE
}

export default function TimerPage() {
	return <Timer />
}
