'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { authService } from '@/services/auth.service'

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
		}
	})

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)

	return (
		<div className='flex min-h-screen'>
			<form
				className='w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout'
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title='Authorisation' />

				<Field
					id='email'
					extra='mb-4'
					label='Email:'
					placeholder='Enter the email'
					type='email'
					{...register('email', { required: 'Email is required!' })}
				/>

				<Field
					id='password'
					extra='mb-6'
					label='Password:'
					placeholder='Enter the password'
					type='password'
					{...register('password', { required: 'Password is required!' })}
				/>

				<div className='flex items-center justify-center gap-5'>
					<Button onClick={() => setIsLoginForm(true)}>Login</Button>
					<Button onClick={() => setIsLoginForm(false)}>Register</Button>
				</div>
			</form>
		</div>
	)
}
