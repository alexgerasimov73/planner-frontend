import { SEASON_EMOJI } from '@/constants/common.constants'

import { ITimeBlockResponse } from '@/types/time-block.types'

export const getSeason = (month: Date): keyof typeof SEASON_EMOJI => {
	const monthNumber = month.getMonth() + 1

	if (monthNumber > 2 && monthNumber < 6) return 'spring'
	if (monthNumber > 5 && monthNumber < 9) return 'summer'
	if (monthNumber > 8 && monthNumber < 12) return 'autumn'
	return 'winter'
}

export const formatTime = (secondsLeft: number) => {
	const minutes = Math.floor(secondsLeft / 60)
	const seconds = secondsLeft % 60

	return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export const calcHoursLeft = (
	items: ReadonlyArray<ITimeBlockResponse> | undefined
) => {
	const totalMinutes = items?.reduce((acc, item) => acc + item.duration, 0) || 0
	const totalHours = Math.floor(totalMinutes / 60)
	const hoursLeft = 24 - totalHours

	return hoursLeft
}
