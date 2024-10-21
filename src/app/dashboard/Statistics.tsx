'use client'

import { Loader } from '@/components/ui/Loader'
import { StatisticCard } from '@/components/ui/statistic-card/StatisticCard'

import { useProfile } from '@/hooks/useProfile'

export const Statistics = () => {
	const { data, isLoading } = useProfile()

	return isLoading ? (
		<Loader />
	) : (
		<div className='grid grid-cols-4 gap-12 mt-7'>
			{data?.statistics.length ? (
				data.statistics.map(statistic => (
					<StatisticCard
						key={statistic.label}
						label={statistic.label}
						value={statistic.value}
					/>
				))
			) : (
				<div>Statistics not loaded</div>
			)}
		</div>
	)
}
