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
		setIsRunning(false)
		if (!activeRound?.id) return

		updateRound({
			id: activeRound.id,
			data: {
				totalSeconds: secondsLeft,
				isCompleted: secondsLeft >= workInterval * 60
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
		setSecondsLeft(workInterval * 60)
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
		setSecondsLeft(workInterval * 60)
	}

	return {
		isUpdateRoundPending,
		nextRoundHandler,
		pauseHandler,
		playHandler,
		prevRoundHandler
	}
}
