import type { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import { removeTokenFromStorage, saveTokenStorage } from './auth-token.service'
import { TypeForm } from '@/app/auth/hooks/useAuth'

export const authService = {
	async main(type: TypeForm, data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)
		console.log('response', response)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/login/access-token'
		)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)

		return response
	},
	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')
		if (response.data) removeTokenFromStorage()

		return response
	}
}
