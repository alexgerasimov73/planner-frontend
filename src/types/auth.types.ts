export interface IAuthForm {
	readonly email: string
	readonly password: string
}

export interface IUser {
	readonly id: number
	readonly email: string
	readonly name?: string
	readonly breakInterval?: number
	readonly intervalsCount?: number
	readonly workInterval?: number
}

export interface IAuthResponse {
	readonly accessToken: string
	readonly user: IUser
}

export type TUserForm = Omit<IUser, 'id'> & { password?: string }
