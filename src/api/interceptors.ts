import axios, { AxiosError, type CreateAxiosDefaults } from 'axios'

import { JWT_EXPIRED, JWT_MUST_BE_PROVIDED } from '@/constants/common.constants'

import { errorCatch } from './error'
import {
	getAccessToken,
	removeTokenFromStorage
} from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

const options: CreateAxiosDefaults = {
	baseURL: process.env.SERVER_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

const axiosClassic = axios.create(options)
const axiosWithAuth = axios.create(options)

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}

	return config
})

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === JWT_EXPIRED ||
				errorCatch(error) === JWT_MUST_BE_PROVIDED) &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return axiosWithAuth.request(originalRequest)
			} catch (error) {
				if (error instanceof AxiosError && errorCatch(error) === JWT_EXPIRED)
					removeTokenFromStorage()
			}
		}

		throw error
	}
)

export { axiosClassic, axiosWithAuth }
