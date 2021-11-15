import { useMutation } from '@apollo/client'
import { useContext, useState } from 'react'
import { CREATE_USER } from '../../api'
import { Context } from '../../App'
import { FormField } from '../formField/formField'
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
				<h2>Create User</h2>
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
					<div className='button-container'>
						<button onClick={handleCreateUser}>Submit</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default CreateUserModal
