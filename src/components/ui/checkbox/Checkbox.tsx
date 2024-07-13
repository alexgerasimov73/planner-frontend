interface ICheckbox {
	readonly checked?: boolean
	readonly onChange: () => void
}

export const Checkbox = ({ checked, onChange }: ICheckbox) => (
	<input
		className='defaultCheckbox relative appearance-none rounded-md border transition ease-linear checked:border-none checked:bg-primary hover:cursor-pointer hover:border-secondary'
		checked={checked}
		type='checkbox'
		name='checkbox'
		onChange={onChange}
	/>
)
