export const FormField = ({ name, startValue = '', onChange }) => {
	return (
		<div>
			<p>{name}: </p>
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
