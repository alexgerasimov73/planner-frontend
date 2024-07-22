import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

import type { IAuthForm } from '@/types/auth.types'
import { TAxiosError } from '@/types/common.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export enum TypeForm {
	login = 'login',
	register = 'register'
}

export const useAuth = (reset: UseFormReset<IAuthForm>) => {
	const { push } = useRouter()
	const [typeForm, setTypeForm] = useState<TypeForm>(TypeForm.login)

	const { isPending: isAuthPending, mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(typeForm, data),
		onSuccess() {
			toast.success('Succesfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError(err: TAxiosError) {
			toast.error(`An error has occured: ${err.response?.data.message}`)
		}
	})
	return { isAuthPending, mutate, setTypeForm }
}
