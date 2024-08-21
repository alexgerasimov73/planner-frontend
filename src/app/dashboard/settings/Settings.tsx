'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { TUserForm } from '@/types/auth.types'

import { useFetchInitData } from './useFetchInitData'
import { useUpdateSettings } from './useUpdateSettings'

export const Settings = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
		reset
	} = useForm<TUserForm>({
		mode: 'onChange'
	})
	const { isUpdatePending, updateSettings } = useUpdateSettings()

	useFetchInitData(reset)

	const onSubmit: SubmitHandler<TUserForm> = data => {
		const { password, ...rest } = data

		updateSettings({
			...rest,
			password: password || undefined
		})
	}

	return (
		<form
			className='w-3/4'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className='grid grid-cols-2 gap-10'>
				<div>
					<Field
						id='email'
						className='mb-4'
						error={!!errors.email}
						label='Email:'
						placeholder='Type the email here...'
						type='email'
						{...register('email', { required: 'Email is required!' })}
					/>

					<Field
						id='name'
						className='mb-4'
						error={!!errors.name}
						label='Name:'
						placeholder='Type the name here...'
						type='name'
						{...register('name', { required: 'Name is required!' })}
					/>

					<Field
						id='password'
						className='mb-10'
						label='Password:'
						placeholder='Type the password here...'
						type='password'
						{...register('password')}
					/>
				</div>

				<div>
					<Field
						disableAutocomplete
						id='workInterval'
						className='mb-4'
						error={!!errors.workInterval}
						isNumber
						label='Work interval (min):'
						placeholder='Type the work interval here...'
						{...register('workInterval', { valueAsNumber: true, max: 59 })}
					/>

					<Field
						disableAutocomplete
						id='breakInterval'
						className='mb-4'
						error={!!errors.breakInterval}
						isNumber
						label='Break interval (min):'
						placeholder='Type the break interval here...'
						{...register('breakInterval', { valueAsNumber: true, max: 59 })}
					/>

					<Field
						disableAutocomplete
						id='intervalsCount'
						className='mb-6'
						error={!!errors.intervalsCount}
						isNumber
						label='Interval count (max 10):'
						placeholder='Type the interval count here...'
						{...register('intervalsCount', { valueAsNumber: true, max: 10 })}
					/>
				</div>
			</div>

			<Button
				disabled={isUpdatePending}
				type='submit'
			>
				Save
			</Button>
		</form>
	)
}
