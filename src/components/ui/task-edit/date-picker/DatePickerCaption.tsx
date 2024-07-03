import dayjs from 'dayjs'
import type { DateFormatter } from 'react-day-picker'

import { SEASON_EMOJI } from '@/constants/common.constants'

import { getSeason } from '@/utils/common.utils'

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
