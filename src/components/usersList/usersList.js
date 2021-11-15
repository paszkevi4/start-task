import { useQuery } from '@apollo/client'
import { useContext, useEffect } from 'react'
import { GET_USERS } from '../../api'
import { Context } from '../../App'
import './usersList.css'

const UserCard = ({ user }) => {
	const { selectedUser, setSelectedUser } = useContext(Context)

	const cardClassName = `user-card ${
		selectedUser === user.id ? 'user-card_active' : ''
	}`

	return (
		<div onClick={() => setSelectedUser(user.id)} className={cardClassName}>
			<p>Name:</p>
			<p>{user.name || 'no name'}</p>
			<p>Rocket:</p>
			<p>{user.rocket || 'no rocket'}</p>
		</div>
	)
}

const UsersList = ({ toggleIsModalOpen }) => {
	const { selectedUser } = useContext(Context)
	const { loading, error, data, refetch } = useQuery(GET_USERS)

	useEffect(() => {
		refetch()
	}, [selectedUser, refetch])

	if (loading) return <p>Loading...</p>
	if (error) return `Error! ${error}`
	return (
		<div className='users-list'>
			<p className='create-user__button' onClick={toggleIsModalOpen}>
				+ CREATE USER
			</p>
			{data.users.map((user) => (
				<UserCard user={user} />
			))}
		</div>
	)
}

export default UsersList
