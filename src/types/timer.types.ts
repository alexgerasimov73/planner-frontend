import type { IBase } from './common.types'

export interface ITimerRoundResponse extends IBase {
	readonly isCompleted?: boolean
	readonly totalSeconds: number
}

export interface ITimerSessionResponse extends IBase {
	readonly isCompleted?: boolean
	readonly rounds?: ITimerRoundResponse[]
}

export type TTimerRoundState = Partial<
	Omit<ITimerRoundResponse, 'id' | 'createdAt' | 'updatedAt'>
>
export type TTimerSessionState = Partial<
	Omit<ITimerSessionResponse, 'id' | 'createdAt' | 'updatedAt'>
>
