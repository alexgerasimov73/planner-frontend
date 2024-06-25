import { ITimerRoundResponse } from '@/types/timer.types'

import type { ITimerState } from '../timer.types'

import { useLoadSettings } from './useLoadSettings'
import { useUpdateRound } from './useUpdateRound'

type TUseTimerActions = ITimerState & {
	readonly rounds?: ITimerRoundResponse[]
}

export function useTimerActions({
	activeRound,
	rounds,
	secondsLeft,
	setActiveRound,
	setIsRunning,
	setSecondsLeft
}: TUseTimerActions) {
	const { workInterval } = useLoadSettings()
	const { isUpdateRoundPending, updateRound } = useUpdateRound()

	const pauseHandler = () => {
		const totalSeconds = workInterval * 60 - secondsLeft

		setIsRunning(false)
		if (!activeRound?.id) return

		updateRound({
			id: activeRound.id,
			data: {
				totalSeconds,
				isCompleted: Math.floor(totalSeconds / 60) >= workInterval
			}
		})
	}

	const playHandler = () => setIsRunning(true)

	const nextRoundHandler = () => {
		if (!activeRound?.id) return

		updateRound({
			id: activeRound.id,
			data: {
				totalSeconds: workInterval * 60,
				isCompleted: true
			}
		})
	}

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast(round => round.isCompleted)

		if (!lastCompletedRound?.id) return

		updateRound({
			id: lastCompletedRound.id,
			data: {
				totalSeconds: 0,
				isCompleted: false
			}
		})

		setActiveRound(lastCompletedRound)
	}

	return {
		isUpdateRoundPending,
		nextRoundHandler,
		pauseHandler,
		playHandler,
		prevRoundHandler
	}
}
