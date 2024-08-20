import { type SubmitHandler, useForm } from 'react-hook-form'

import { Loader } from '@/components/ui/Loader'
import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { IAuthForm } from '@/types/auth.types'

import styles from './Auth.module.scss'
import { TypeForm, useAuth } from './hooks/useAuth'

interface IAuthFormProps {
	readonly type: TypeForm
}

export const AuthForm = ({ type }: IAuthFormProps) => {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({
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

			<Button
				className={styles.formButton}
				onClick={handleActionForm}
			>
				{type}
			</Button>
		</form>
	)
}
