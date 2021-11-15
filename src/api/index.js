import { gql } from '@apollo/client'

export const GET_USERS = gql`
	query getUsers($limit: Int!, $offset: Int!) {
		users(limit: $limit, offset: $offset, order_by: { id: asc }) {
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

export const CREATE_USER = gql`
	mutation create($objects: [users_insert_input!]!) {
		user: insert_users(objects: $objects) {
			returning {
				twitter
				timestamp
				rocket
				name
				id
			}
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
