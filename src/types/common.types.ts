import { AxiosError } from 'axios'

interface IAxiosErrorData {
	readonly error: string
	readonly message: string
	readonly statusCode: number
}

export type TAxiosError = AxiosError<IAxiosErrorData>

export interface IBase {
	readonly createdAt?: string
	readonly id: string
	readonly updatedAt?: string
}

export interface IOption {
	readonly label: string
	readonly value: string
}

export enum TasksRepresentation {
	list = 'list',
	kanban = 'kanban'
}
