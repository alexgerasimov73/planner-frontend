import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { ITimerRoundResponse } from '@/types/timer.types'

import { useLoadSettings } from './useLoadSettings'
import { timerService } from '@/services/timer.service'

interface IUseTodaySession {
	readonly setActiveRound: Dispatch<
		SetStateAction<ITimerRoundResponse | undefined>
	>
	readonly setSecondsLeft: Dispatch<SetStateAction<number>>
}

export function useTodaySession({
	setActiveRound,
	setSecondsLeft
}: IUseTodaySession) {
	// TODO: Delete workInterval.
	const { workInterval } = useLoadSettings()
	const {
		data: sessionsResponse,
		isLoading,
		isSuccess
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => timerService.getTodaySession()
	})

	const rounds = sessionsResponse?.data.timerRounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds, workInterval])

	return {
		isLoading,
		isSuccess,
		sessionData: sessionsResponse?.data,
		workInterval
	}
}
