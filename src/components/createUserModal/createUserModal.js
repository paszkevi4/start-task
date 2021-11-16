import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_USER, USER_FRAGMENT } from '../../api'
import { FormField } from '../formField/formField'
import { withRouter } from 'react-router-dom'
import './createUserModal.css'

const CreateUserModal = ({ toggleIsOpen, history }) => {
	console.log('~ history', history)
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

	const [createUser] = useMutation(CREATE_USER, {
		update: (cache, { data }) => {
			const createdUser = data.user.returning[0]
			history.push(`/user/${createdUser.id}`)
			cache.modify({
				fields: {
					users(existingUsers = []) {
						const newUserRef = cache.writeFragment({
							data: createdUser,
							fragment: USER_FRAGMENT,
						})
						return [newUserRef, ...existingUsers]
					},
				},
			})
		},
	})

	const handleCreateUser = async (e) => {
		e.preventDefault()
		await createUser({
			variables: {
				objects: [userData],
			},
		})
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

export default withRouter(CreateUserModal)
