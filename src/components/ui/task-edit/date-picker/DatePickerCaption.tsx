import dayjs from 'dayjs'
import type { DateFormatter } from 'react-day-picker'

import { SEASON_EMOJI } from '@/constants/constants'

const getSeason = (month: Date): keyof typeof SEASON_EMOJI => {
	const monthNumber = month.getMonth() + 1

	if (monthNumber > 2 && monthNumber < 6) return 'spring'
	if (monthNumber > 5 && monthNumber < 9) return 'summer'
	if (monthNumber > 8 && monthNumber < 12) return 'autumn'
	return 'winter'
}

export const formatCaption: DateFormatter = month => {
	const season = getSeason(month)

	return (
		<>
			<span
				role='img'
				aria-label={season}
				className='mr-2'
			>
				{SEASON_EMOJI[season]}
			</span>
			{dayjs(month).format('MMMM')}
		</>
	)
}
