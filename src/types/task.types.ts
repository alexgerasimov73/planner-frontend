import type { IBase } from './common.types'

export enum EnumTaskPriority {
	low = 'low',
	medium = 'medium',
	high = 'high'
}

export interface ITaskResponse extends IBase {
	readonly isCompleted: boolean
	readonly name: string
	readonly priority: EnumTaskPriority
}

export type TTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>
