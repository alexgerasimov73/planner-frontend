import { IBase } from './common.types'

export interface ITimeBlockResponse extends IBase {
	readonly color?: string
	readonly duration: number
	readonly name: string
	readonly order: number
}

export type TTimeBlockFormState = Partial<
	Omit<ITimeBlockResponse, 'createdAt' | 'updatedAt'>
>
