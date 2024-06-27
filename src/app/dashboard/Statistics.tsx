'use client'

import Link from 'next/link'

import { Loader } from '@/components/ui/Loader'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { useProfile } from '@/hooks/useProfile'

export default function Statistics() {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<Link
						key={statistic.label}
						className='rounded p-layout shadow bg-white text-center hover:-translate-y-1 transition-transform duration-100 cursor-pointer'
						href={DASHBOARD_PAGES.TASKS}
					>
						<div className='text-xl'>{statistic.label}</div>
						<div className='text-3xl font-semibold'>{statistic.value}</div>
					</Link>
				))
			) : (
				<div>Statistics not loaded</div>
			)}
		</div>
	)
}
