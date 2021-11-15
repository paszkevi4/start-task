import { useQuery } from '@apollo/client'
import { useContext } from 'react'
import { GET_SINGLE_USER, GET_USERS } from '../../api'
import { Context } from '../../App'
// import './usersList.css'

const UsersPage = () => {
	const { selectedUser: userId } = useContext(Context)
	const { loading, error, data } = useQuery(GET_SINGLE_USER, {
		variables: { userId },
		skip: !userId,
	})
	console.log('~ data', data)
	if (loading) return <p>Loading...</p>
	if (error) return <p>Error(</p>
	return (
		<div className='users-list'>
			{/* {data.users.map((user) => (
				<UserCard user={user} />
			))} */}
		</div>
	)
}

export default UsersPage
