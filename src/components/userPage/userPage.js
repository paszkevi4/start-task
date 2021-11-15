import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useContext, useEffect, useState } from 'react'
import { DELETE_USER, GET_SINGLE_USER, UPDATE_USER } from '../../api'
import { Context } from '../../App'
import { FormField } from './formField'
// import './usersList.css'

const UsersPage = () => {
	const { selectedUser: userId, setSelectedUser } = useContext(Context)
	const [userData, setUserData] = useState({})

	const { loading, error, data, refetch } = useQuery(GET_SINGLE_USER, {
		variables: { userId },
	})

	const [updateUser] = useMutation(UPDATE_USER, {
		variables: {
			where: { id: { _eq: userId } },
		},
		onCompleted: refetch,
	})

	const [deleteUser] = useMutation(DELETE_USER, {
		variables: {
			where: { id: { _eq: userId } },
		},
		onCompleted: () => setSelectedUser(''),
	})

	useEffect(() => {
		const onCompleted = (data) => setUserData(data.user)
		if (!loading && !error) {
			onCompleted(data)
		}
	}, [loading, data, error])

	const submitForm = (e) => {
		e.preventDefault()
		const { name, rocket, twitter, timestamp } = userData
		const newR = new Date(timestamp)
		if (!newR.getTime()) {
			console.log('Time is invalid')
			return
		}
		updateUser({
			variables: {
				set: { name, rocket, twitter, timestamp: new Date(timestamp) },
			},
		})
	}

	const DeleteSelecteduser = (e) => {
		e.preventDefault()
		deleteUser()
	}

	if (loading) return <p>Loading...</p>
	if (error) return `Error! ${error}`

	return (
		<form className='user-page'>
			<FormField
				name='name'
				startValue={userData?.name || ''}
				onChange={setUserData}
			/>
			<FormField
				name='twitter'
				startValue={userData?.twitter || ''}
				onChange={setUserData}
			/>
			<FormField
				name='rocket'
				startValue={userData?.rocket || ''}
				onChange={setUserData}
			/>
			<FormField
				name='timestamp'
				startValue={userData?.timestamp || ''}
				onChange={setUserData}
			/>
			<button onClick={submitForm}>Submit</button>
			<button onClick={DeleteSelecteduser}>Delete User</button>
		</form>
	)
}

export default UsersPage
