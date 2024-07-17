'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { Loader } from '@/components/ui/Loader'
import { Logo } from '@/components/ui/Logo'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { IAuthForm } from '@/types/auth.types'

import { DASHBOARD_PAGES } from '@/config/pages-url.config'

import { TypeForm, useAuth } from './hooks/useAuth'

export const Auth = () => {
	const { prefetch } = useRouter()
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const { isAuthPending, mutate, setTypeForm } = useAuth(reset)

	useEffect(() => prefetch(DASHBOARD_PAGES.HOME), [prefetch])

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)
	const handleActionForm = (typeForm: TypeForm) => () => setTypeForm(typeForm)

	return (
		<div className='relative flex-center flex-col min-h-screen'>
			<Logo
				className='!absolute top-5 left-5'
				isPrimaryColor
			/>
			<h1>Welcome back</h1>
			<p>Login into your account</p>
			<p>or register</p>

			{isAuthPending ? (
				<div className='flex-center w-1/3 h-80'>
					<Loader />
				</div>
			) : (
				<form
					className='w-1/3 min-h-80 p-layout'
					onSubmit={handleSubmit(onSubmit)}
				>
					<Field
						id='email'
						className='mb-4'
						label='Email:'
						placeholder='Type the email here...'
						type='email'
						{...register('email', { required: 'Email is required!' })}
					/>

					<Field
						id='password'
						className='mb-6'
						label='Password:'
						placeholder='Type the password here...'
						type='password'
						{...register('password', { required: 'Password is required!' })}
					/>

					<div className='flex-center gap-7'>
						<Button onClick={handleActionForm(TypeForm.login)}>Login</Button>

						<Button onClick={handleActionForm(TypeForm.register)}>
							Register
						</Button>
					</div>
				</form>
			)}
		</div>
	)
}
