import './formField.css'

export const FormField = ({ name, startValue = '', onChange }) => {
	return (
		<div className='form-field'>
			<p className='form-field__name'>{name}: </p>
			<input
				value={startValue}
				onChange={(e) =>
					onChange((prevData) => {
						return {
							...prevData,
							[name]: e?.target?.value,
						}
					})
				}
			/>
		</div>
	)
}
