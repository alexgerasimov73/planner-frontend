import { Controller, type SubmitHandler, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/buttons/Button'
import { Field } from '@/components/ui/fields/Field'
import { SingleSelect } from '@/components/ui/task-edit/SingleSelect'

import { TIME_BLOCKING_COLORS } from '@/constants/common.constants'

import type { TTimeBlockFormState } from '@/types/time-block.types'

import { getDataForSelect } from '@/utils/common.utils'

import { useCreateTimeBlock } from './hooks/useCreateTimeBlock'
import { useUpdateTimeBlock } from './hooks/useUpdateTimeBlock'

export const TimeBlockingForm = () => {
	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
		reset,
		watch
	} = useFormContext<TTimeBlockFormState>()

	const existedId = watch('id')
	const { isCreatePending, createTimeBlock } = useCreateTimeBlock()
	const { updataTimeBlock } = useUpdateTimeBlock(existedId)

	const onSubmit: SubmitHandler<TTimeBlockFormState> = data => {
		const { color, id, ...rest } = data
		const dto = { ...rest, color: color || undefined }

		if (id) {
			updataTimeBlock({ id, data: dto })
		} else {
			createTimeBlock(dto)
		}

		reset({
			color: TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1],
			duration: 0,
			id: undefined,
			name: '',
			order: 1
		})
	}

	return (
		<form
			className='w-3/5'
			onSubmit={handleSubmit(onSubmit)}
		>
			<Field
				id='name'
				className='mb-4'
				error={!!errors.name}
				disableAutocomplete
				label='Block title:'
				placeholder='Type the block title here...'
				{...register('name', { required: true })}
			/>

			<Field
				id='duration'
				className='mb-4'
				error={!!errors.duration}
				disableAutocomplete
				isNumber
				label='Duration (min):'
				placeholder='Type the duration here...'
				{...register('duration', { required: true, valueAsNumber: true })}
			/>

			<div>
				<span className='inline-block mb-1.5'>Color:</span>

				<Controller
					control={control}
					name='color'
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={getDataForSelect(TIME_BLOCKING_COLORS)}
							isColorSelected
							value={
								value || TIME_BLOCKING_COLORS[TIME_BLOCKING_COLORS.length - 1]
							}
							onChange={onChange}
						/>
					)}
				/>
			</div>

			<Button
				className='mt-6'
				disabled={isCreatePending}
				type='submit'
			>
				{existedId ? 'Update' : 'Create'}
			</Button>
		</form>
	)
}
