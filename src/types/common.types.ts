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
