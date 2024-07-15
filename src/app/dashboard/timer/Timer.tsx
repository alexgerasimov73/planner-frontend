'use client'

import { Pause, Play, RefreshCcw } from 'lucide-react'

import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'

import { formatTime } from '@/utils/common.utils'

import { useCreateSession } from './hooks/useCreateSession'
import { useDeleteSession } from './hooks/useDeleteSession'
import { useLoadSettings } from './hooks/useLoadSettings'
import { useTimer } from './hooks/useTimer'
import { useTimerActions } from './hooks/useTimerActions'
import { useTodaySession } from './hooks/useTodaySession'
import { TimerRounds } from './rounds/TimerRounds'

export const Timer = () => {
	const { workInterval } = useLoadSettings()
	const {
		activeRound,
		isRunning,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft
	} = useTimer()

	const { isLoading, sessionData } = useTodaySession({
		setActiveRound,
		setSecondsLeft
	})
	const rounds = sessionData?.timerRounds
	const {
		isUpdateRoundPending,
		nextRoundHandler,
		pauseHandler,
		playHandler,
		prevRoundHandler
	} = useTimerActions({
		activeRound,
		rounds,
		secondsLeft,
		setActiveRound,
		setIsRunning,
		setSecondsLeft
	})

	const { isCreatePending, createSession } = useCreateSession()
	const { isDeletePending, deleteSession } = useDeleteSession(() =>
		setSecondsLeft(workInterval * 60)
	)

	const handleCreateSession = () => createSession()

	const handleDeleteSession = () => {
		if (!sessionData?.id) return

		setIsRunning(false)
		deleteSession(sessionData.id)
	}

	return (
		<div className='relative w-80 text-center'>
			{!isLoading && (
				<div className='text-7xl font-semibold'>{formatTime(secondsLeft)}</div>
			)}

			{isLoading ? (
				<Loader />
			) : sessionData ? (
				<>
					<TimerRounds
						activeRound={activeRound}
						rounds={rounds}
						nextRoundHandler={nextRoundHandler}
						prevRoundHandler={prevRoundHandler}
					/>
					<button
						className='mt-6 opacity-70 transition-opacity hover:opacity-100'
						disabled={isUpdateRoundPending}
						onClick={isRunning ? pauseHandler : playHandler}
					>
						{isRunning ? <Pause size={30} /> : <Play size={30} />}
					</button>

					<button
						className='absolute top-0 right-0 opacity-40 transition-opacity hover:opacity-90'
						disabled={isDeletePending}
						onClick={handleDeleteSession}
					>
						<RefreshCcw size={19} />
					</button>
				</>
			) : (
				<Button
					className='mt-1'
					disabled={isCreatePending}
					onClick={handleCreateSession}
				>
					Create Session
				</Button>
			)}
		</div>
	)
}
