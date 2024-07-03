import { USER_URL } from '@/constants/common.constants'

import type { IUser, TUserForm } from '@/types/auth.types'
import type { IOption } from '@/types/common.types'

import { axiosWithAuth } from '@/api/interceptors'

export interface IProfileResponse {
	readonly user: IUser
	readonly statistics: IOption[]
}

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
