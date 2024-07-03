import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ITimerRoundResponse } from '@/types/timer.types'

import styles from './TimerRounds.module.scss'

interface ITimerRounds {
	readonly activeRound?: ITimerRoundResponse
	readonly rounds?: ITimerRoundResponse[]
	readonly nextRoundHandler: () => void
	readonly prevRoundHandler: () => void
}

export function TimerRounds({
	activeRound,
	rounds,
	nextRoundHandler,
	prevRoundHandler
}: ITimerRounds) {
	const isCanPrevRound = rounds
		? rounds.some(round => round.isCompleted)
		: false
	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	return (
		<div className={styles.container}>
			<button
				className={styles.button}
				disabled={!isCanPrevRound}
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
			>
				<ChevronLeft size={23} />
			</button>

			<div className={styles.roundsContainer}>
				{rounds &&
					rounds.map((round, index) => (
						<div
							key={index}
							className={cn(styles.round, {
								[styles.completed]: round.isCompleted,
								[styles.active]:
									!round.isCompleted && round.id === activeRound?.id
							})}
						></div>
					))}
			</div>

			<button
				className={styles.button}
				disabled={!isCanNextRound}
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}
