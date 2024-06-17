import { useEffect, useState } from 'react'

import { ITimerRoundResponse } from '@/types/timer.types'

import { useLoadSettings } from './useLoadSettings'

export function useTimer() {
	const { breakInterval, workInterval } = useLoadSettings()
	const [activeRound, setActiveRound] = useState<ITimerRoundResponse>()
	const [isBreakTime, setIsBreakTime] = useState(false)
	const [isRunning, setIsRunning] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState(workInterval * 60)

	useEffect(() => {
		let interval: NodeJS.Timeout | null = null

		if (isRunning) {
			interval = setInterval(
				() => setSecondsLeft(secondsLeft => secondsLeft - 1),
				1000
			)
		} else if (!isRunning && secondsLeft !== 0 && interval) {
			clearInterval(interval)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [isRunning, secondsLeft])

	useEffect(() => {
		// TODO: Leave a comment.
		if (secondsLeft > 0) return

		setIsBreakTime(!isBreakTime)
		setSecondsLeft((isBreakTime ? workInterval : breakInterval) * 60)
	}, [])

	return {}
}
