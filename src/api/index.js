import { gql } from '@apollo/client'

export const GET_USERS = gql`
	query getUsers {
		users {
			id
			name
			rocket
		}
	}
`

export const GET_SINGLE_USER = gql`
	query getUsers($userId: uuid!) {
		user: users_by_pk(id: $userId) {
			id
			name
			rocket
			twitter
			timestamp
		}
	}
`

export const UPDATE_USER = gql`
	mutation updateUser($where: users_bool_exp!, $set: users_set_input) {
		update_users(where: $where, _set: $set) {
			returning {
				name
				rocket
			}
		}
	}
`

export const DELETE_USER = gql`
	mutation Delete_users($where: users_bool_exp!) {
		delete_users(where: $where) {
			affected_rows
		}
	}
`
