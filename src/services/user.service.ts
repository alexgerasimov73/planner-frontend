import { TUserForm } from '@/types/auth.types'

import { axiosWithAuth } from '@/api/interceptors'

import { IUser } from './../types/auth.types'

export interface IProfileResponse {
	readonly user: IUser
	readonly statistics: {
		readonly label: string
		readonly value: string
	}[]
}

const USER_URL = '/user/profile'

export const userService = {
	async getProfile() {
		const response = await axiosWithAuth.get<IProfileResponse>(USER_URL)
		return response.data
	},
	async update(data: TUserForm) {
		const response = await axiosWithAuth.put(USER_URL, data)
		return response.data
	}
}
