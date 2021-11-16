import { useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { DELETE_USER, GET_SINGLE_USER, UPDATE_USER } from '../../api'
import { FormField } from '../formField/formField'
import './userPage.css'

const UsersPage = (props) => {
	const userId = props.match.params.userId
	const [userData, setUserData] = useState({})

	const { loading, error, data } = useQuery(GET_SINGLE_USER, {
		variables: { userId },
	})

	const [updateUser] = useMutation(UPDATE_USER, {
		variables: {
			where: { id: { _eq: userId } },
		},
	})

	const [deleteUser] = useMutation(DELETE_USER, {
		variables: {
			where: { id: { _eq: userId } },
		},
		onCompleted: () => props.history.push(`/`),
		update: (cache, { data }) => {
			const deletedUserId = data.delete_users?.returning?.[0]?.id
			cache.modify({
				fields: {
					users(existingUsers = [], { readField }) {
						return existingUsers.filter(
							(userRef) =>
								deletedUserId !== readField('id', userRef),
						)
					},
				},
			})
		},
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
		const newDate = new Date(timestamp)
		if (!newDate.getTime()) {
			console.log('Time is invalid')
			return
		}
		updateUser({
			variables: {
				set: { name, rocket, twitter, timestamp: new Date(timestamp) },
			},
			optimisticResponse: {
				update_users: {
					returning: {
						name,
						rocket,
						twitter,
						timestamp,
						id: Date.now(),
						__typename: 'users',
					},
				},
			},
		})
	}

	const handleDeleteUser = (e) => {
		e.preventDefault()
		deleteUser()
	}

	if (loading) return <p>Loading...</p>
	if (error) return `Error! ${error}`

	return (
		<form className='user-page'>
			<h2>User</h2>
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
			<FormField
				name='timestamp'
				startValue={userData?.timestamp}
				onChange={setUserData}
			/>
			<div className='button-container'>
				<button onClick={submitForm}>Submit</button>
				<button onClick={handleDeleteUser}>Delete User</button>
			</div>
		</form>
	)
}

export default UsersPage
