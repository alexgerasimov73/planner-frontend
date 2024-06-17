import type { Dispatch, SetStateAction } from 'react'

import type { ITimerRoundResponse } from '@/types/timer.types'

export interface ITimerState {
	readonly activeRound?: ITimerRoundResponse
	readonly secondsLeft: number
	readonly setActiveRound: Dispatch<
		SetStateAction<ITimerRoundResponse | undefined>
	>
	readonly setIsRunning: Dispatch<SetStateAction<boolean>>
	readonly setSecondsLeft: Dispatch<SetStateAction<number>>
}
