import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../api'
import './usersList.css'
import { NavLink } from 'react-router-dom'

const UserCard = ({ user }) => {
	// const cardClassName = `user-card ${
	// 	selectedUser === user.id ? 'user-card_active' : ''
	// }`

	return (
		<NavLink
			to={`/user/${user.id}`}
			className='user-card'
			activeClassName='user-card_active'
		>
			<p>Name:</p>
			<p>{user.name || 'no name'}</p>
			<p>Rocket:</p>
			<p>{user.rocket || 'no rocket'}</p>
		</NavLink>
	)
}

const UsersList = ({ toggleIsModalOpen }) => {
	const { loading, error, data, fetchMore } = useQuery(GET_USERS, {
		variables: {
			offset: 0,
			limit: 10,
		},
	})

	if (loading) return <p>Loading...</p>
	if (error) return `Error! ${error}`
	return (
		<div className='users-list'>
			<p className='create-user__button' onClick={toggleIsModalOpen}>
				+ CREATE USER
			</p>
			{data.users.map((user) => (
				<UserCard key={user.id} user={user} />
			))}
			<p
				className='create-user__button'
				onClick={() =>
					fetchMore({
						variables: {
							offset: data.users.length,
						},
						updateQuery: (prevData, { fetchMoreResult }) => {
							fetchMoreResult.users = [
								...prevData.users,
								...fetchMoreResult.users,
							]
							return fetchMoreResult
						},
					})
				}
			>
				LOAD MORE
			</p>
		</div>
	)
}

export default UsersList
