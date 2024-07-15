import { useEffect, useState } from 'react'

import type { ITimerRoundResponse } from '@/types/timer.types'

import { useLoadSettings } from './useLoadSettings'
import { useUpdateRound } from './useUpdateRound'

export const useTimer = () => {
	const { breakInterval, workInterval } = useLoadSettings()
	const { updateRound } = useUpdateRound()
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>()
	const [isWorkTime, setIsWorkTime] = useState(true)
	const [isRunning, setIsRunning] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(
				() => setSecondsLeft(secondsLeft => secondsLeft - 1),
				1000
			)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isRunning, secondsLeft])

	useEffect(() => {
		// If time is up, switch between break and work intervals.
		if (secondsLeft > 0) return

		setIsWorkTime(!isWorkTime)
		setSecondsLeft((isWorkTime ? breakInterval : workInterval) * 60)

		if (activeRound && !isWorkTime) {
			updateRound({
				id: activeRound.id,
				data: {
					totalSeconds: workInterval * 60,
					isCompleted: true
				}
			})
		}
	}, [activeRound, breakInterval, isWorkTime, secondsLeft, workInterval])

	return {
		activeRound,
		isRunning,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft
	}
}
