import { useQuery } from '@apollo/client'
import { useContext } from 'react'
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

const UsersList = () => {
	const { loading, error, data } = useQuery(GET_USERS)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error(</p>
	return (
		<div className='users-list'>
			{data.users.map((user) => (
				<UserCard user={user} />
			))}
		</div>
	)
}

export default UsersList
