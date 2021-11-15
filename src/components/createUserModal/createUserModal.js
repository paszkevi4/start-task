import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { CREATE_USER } from '../../api'
import { Context } from '../../App'
import { FormField } from '../userPage/formField'
import './createUserModal.css'

const CreateUserModal = ({ toggleIsOpen }) => {
	const { setSelectedUser } = useContext(Context)
	const [userData, setUserData] = useState({
		name: '',
		twitter: '',
		rocket: '',
	})

	const handleClose = (e) => {
		if (e.target.classList.value === 'modal-window') {
			toggleIsOpen()
		}
	}

	const [createUser] = useMutation(CREATE_USER)

	const handleCreateUser = async (e) => {
		e.preventDefault()
		const r = await createUser({
			variables: {
				objects: [userData],
			},
		})
		setSelectedUser(r.data?.user?.returning?.[0]?.id)
		toggleIsOpen()
	}

	return (
		<div className='modal-window' onClick={handleClose}>
			<div className='modal-component'>
				<form className='user-page'>
					<FormField
						name='name'
						startValue={userData?.name}
						onChange={setUserData}
					/>
					<FormField
						name='twitter'
						startValue={userData?.twitter}
						onChange={setUserData}
					/>
					<FormField
						name='rocket'
						startValue={userData?.rocket}
						onChange={setUserData}
					/>
					<button onClick={handleCreateUser}>Submit</button>
				</form>
			</div>
		</div>
	)
}

export default CreateUserModal
