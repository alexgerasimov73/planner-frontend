'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { TUserForm } from '@/types/auth.types'

import { useFetchInitData } from './useFetchInitData'
import { useUpdateSettings } from './useUpdateSettings'

export const Settings = () => {
	const { handleSubmit, register, reset } = useForm<TUserForm>({
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
						classNames='mb-4'
						label='Email:'
						placeholder='Type the email here...'
						type='email'
						{...register('email', { required: 'Email is required!' })}
					/>

					<Field
						id='name'
						classNames='mb-4'
						label='Name:'
						placeholder='Type the name here...'
						type='name'
						{...register('name', { required: 'Name is required!' })}
					/>

					<Field
						id='password'
						classNames='mb-10'
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
						classNames='mb-4'
						isNumber
						label='Work interval (min):'
						placeholder='Type the work interval here...'
						{...register('workInterval', { valueAsNumber: true })}
					/>

					<Field
						disableAutocomplete
						id='breakInterval'
						classNames='mb-4'
						isNumber
						label='Break interval (min):'
						placeholder='Type the break interval here...'
						{...register('breakInterval', { valueAsNumber: true })}
					/>

					<Field
						disableAutocomplete
						id='intervalsCount'
						classNames='mb-6'
						isNumber
						label='Interval count (max 10):'
						placeholder='Type the interval count here...'
						{...register('intervalsCount', { valueAsNumber: true })}
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
