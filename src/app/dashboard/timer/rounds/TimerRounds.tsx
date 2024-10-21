import cn from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import type { ITimerRoundResponse } from '@/types/timer.types'

import styles from './TimerRounds.module.scss'

interface Props {
	readonly activeRound?: ITimerRoundResponse
	readonly rounds?: ITimerRoundResponse[]
	readonly nextRoundHandler: () => void
	readonly prevRoundHandler: () => void
}

type TDirection = 'previous' | 'next'

export const TimerRounds = ({
	activeRound,
	rounds,
	nextRoundHandler,
	prevRoundHandler
}: Props) => {
	const hasPrevRound = rounds ? rounds.some(round => round.isCompleted) : false
	const hasNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false

	const handleChangeRound = (direction: TDirection) => () => {
		if (direction === 'previous' && hasPrevRound) return prevRoundHandler()
		if (direction === 'next' && hasNextRound) return nextRoundHandler()
	}

	return (
		<div className='flex-center gap-2'>
			<button
				className='mt-1 opacity-20 transition-opacity hover:opacity-100 disabled:opacity-20'
				disabled={!hasPrevRound}
				onClick={handleChangeRound('previous')}
			>
				<ChevronLeft size={23} />
			</button>

			<div className='flex-center gap-3 mt-1'>
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
				disabled={!hasNextRound}
				onClick={handleChangeRound('next')}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	)
}
