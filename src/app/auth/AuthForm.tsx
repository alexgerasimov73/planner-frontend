import { type SubmitHandler, useForm } from 'react-hook-form'

import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { IAuthForm } from '@/types/auth.types'

import styles from './Auth.module.scss'
import { TypeForm, useAuth } from './hooks/useAuth'

interface Props {
	readonly type: TypeForm
}

export const AuthForm = ({ type }: Props) => {
	const {
		formState: { errors },
		register,
		handleSubmit,
		reset
	} = useForm<IAuthForm>({
		mode: 'onChange'
	})
	const { isAuthPending, mutate, setTypeForm } = useAuth(reset)

	const onSubmit: SubmitHandler<IAuthForm> = data => mutate(data)
	const handleActionForm = () => setTypeForm(type)

	return isAuthPending ? (
		<div className={styles.loader}>
			<Loader />
		</div>
	) : (
		<form
			className={styles.form}
			onSubmit={handleSubmit(onSubmit)}
		>
			<Field
				id={`email-${type}`}
				className='mb-4'
				error={!!errors.email}
				label='Email:'
				placeholder='Type the email here...'
				type='email'
				{...register('email', { required: 'Email is required!' })}
			/>

			<Field
				id={`password-${type}`}
				className='mb-6'
				error={!!errors.password}
				label='Password:'
				placeholder='Type the password here...'
				type='password'
				{...register('password', {
					required: 'Password is required!',
					minLength: 5
				})}
			/>

			<Button
				className={styles.formButton}
				onClick={handleActionForm}
			>
				{type}
			</Button>
		</form>
	)
}
