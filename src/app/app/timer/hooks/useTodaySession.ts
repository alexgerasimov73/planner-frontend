import { useQuery } from '@tanstack/react-query'
import { Dispatch, SetStateAction, useEffect } from 'react'

import { ITimerRoundResponse } from '@/types/timer.types'

import { timerService } from '@/services/timer.service'

interface IUseTodaySession {
	readonly workInterval: number
	readonly setActiveRound: Dispatch<
		SetStateAction<ITimerRoundResponse | undefined>
	>
	readonly setSecondsLeft: Dispatch<SetStateAction<number>>
}

export function useTodaySession({
	workInterval,
	setActiveRound,
	setSecondsLeft
}: IUseTodaySession) {
	const {
		data: sessionsResponse,
		isLoading,
		isSuccess,
		refetch
	} = useQuery({
		queryKey: ['get today session'],
		queryFn: () => timerService.getTodaySession()
	})

	const rounds = sessionsResponse?.data.rounds

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find(round => !round.isCompleted)
			setActiveRound(activeRound)

			if (activeRound && activeRound.totalSeconds !== 0) {
				setSecondsLeft(workInterval - activeRound.totalSeconds)
			}
		}
	}, [isSuccess, rounds, workInterval])

	return { isLoading, isSuccess, sessionsResponse, refetch }
}
