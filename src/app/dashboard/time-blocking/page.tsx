import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/common.constants'

import { TimeBlocking } from './TimeBlocking'

export const metadata: Metadata = {
	title: 'Time blocking',
	...NO_INDEX_PAGE
}

export default function TimeBlockingPage() {
	return <TimeBlocking />
}
