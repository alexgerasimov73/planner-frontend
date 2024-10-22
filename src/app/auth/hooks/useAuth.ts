import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { UseFormReset } from 'react-hook-form'
import { toast } from 'sonner'

import type { IAuthForm } from '@/types/auth.types'
import { TAxiosError } from '@/types/common.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

export const enum TypeForm {
	login = 'login',
	register = 'register'
}

export const useAuth = (
	reset: UseFormReset<IAuthForm>,
	setIsPending: (isPending: boolean) => void
) => {
	const { push } = useRouter()
	const [typeForm, setTypeForm] = useState<TypeForm>(TypeForm.login)

	const { isPending: isAuthPending, mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main(typeForm, data),
		onMutate: () => {
			setIsPending(true)
			toast.info(
				'ATTENTION! The first request on the server might take 1-2 minutes because it launches the server and needs some time to be ready.',
				{ duration: 10_000 }
			)
		},
		onSuccess: () => {
			toast.success('Succesfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError: (err: TAxiosError) => {
			toast.error(`An error has occured: ${err.response?.data.message}`)
		},
		onSettled: () => setIsPending(false)
	})
	return { isAuthPending, mutate, setTypeForm }
}
