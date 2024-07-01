'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

interface AxiosErrorData {
	readonly error: string
	readonly message: string
	readonly statusCode: number
}

export function Auth() {
	const [isLoginForm, setIsLoginForm] = useState(false)
	const { push, prefetch } = useRouter()
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const { mutate } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) =>
			authService.main(isLoginForm ? 'login' : 'register', data),
		onSuccess() {
			toast.success('Succesfully login!')
			reset()
			push(DASHBOARD_PAGES.HOME)
		},
		onError(err: AxiosError<AxiosErrorData>) {
			toast.error(`An error has occured: ${err.response?.data.message}`)
		}
	})

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)

	return (
		<div className='relative flex flex-col items-center justify-center  min-h-screen'>
			<Logo
				className='!absolute top-5 left-5'
				isPrimaryColor
			/>
			<h1>Welcome back</h1>
			<p>Login into your account</p>
			<p>or register</p>

			<form
				className='w-1/3 p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Field
					id='email'
					extra='mb-4'
					label='Email:'
					placeholder='Type the email here...'
					type='email'
					{...register('email', { required: 'Email is required!' })}
				/>

				<Field
					id='password'
					extra='mb-6'
					label='Password:'
					placeholder='Type the password here...'
					type='password'
					{...register('password', { required: 'Password is required!' })}
				/>

				<div className='flex items-center justify-center gap-7'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
