'use client'

import { type SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'

import type { TUserForm } from '@/types/auth.types'

import { useFetchInitData } from './useFetchInitData'
import { useUpdateSettings } from './useUpdateSettings'

export default function Settings() {
	const { handleSubmit, register, reset } = useForm<TUserForm>({
		mode: 'onChange'
	})

	useFetchInitData(reset)

	const { isPending, mutate } = useUpdateSettings()

	const onSubmit: SubmitHandler<TUserForm> = data => {
		const { password, ...rest } = data

		mutate({
			...rest,
			password: password || undefined
		})
	}

	return (
		<div>
			<form
				className='w-3/4'
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className='grid grid-cols-2 gap-10'>
					<div>
						<Field
							id='email'
							extra='mb-4'
							label='Email:'
							placeholder='Type the email here...'
							type='email'
							{...register('email', { required: 'Email is required!' })}
						/>

						<Field
							id='name'
							extra='mb-4'
							label='Name:'
							placeholder='Type the name here...'
							type='name'
							{...register('name', { required: 'Name is required!' })}
						/>

						<Field
							id='password'
							extra='mb-10'
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
							extra='mb-4'
							isNumber
							label='Work interval (min):'
							placeholder='Type the work interval here...'
							{...register('workInterval', { valueAsNumber: true })}
						/>

						<Field
							disableAutocomplete
							id='breakInterval'
							extra='mb-4'
							isNumber
							label='Break interval (min):'
							placeholder='Type the break interval here...'
							{...register('breakInterval', { valueAsNumber: true })}
						/>

						<Field
							disableAutocomplete
							id='intervalsCount'
							extra='mb-6'
							isNumber
							label='Interval count (max 10):'
							placeholder='Type the interval count here...'
							{...register('intervalsCount', { valueAsNumber: true })}
						/>
					</div>
				</div>

				<Button
					disabled={isPending}
					type='submit'
				>
					Save
				</Button>
			</form>
		</div>
	)
}
