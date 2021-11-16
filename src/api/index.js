import { gql } from '@apollo/client'

export const USER_FRAGMENT = gql`
	fragment UserFragment on users {
		id
		name
		rocket
	}
`

export const GET_USERS = gql`
	${USER_FRAGMENT}
	query getUsers($limit: Int!, $offset: Int!) {
		users(limit: $limit, offset: $offset, order_by: { id: asc }) {
			...UserFragment
		}
	}
`

export const GET_SINGLE_USER = gql`
	${USER_FRAGMENT}
	query getUsers($userId: uuid!) {
		user: users_by_pk(id: $userId) {
			...UserFragment
			twitter
			timestamp
		}
	}
`

export const CREATE_USER = gql`
	${USER_FRAGMENT}
	mutation createUser($objects: [users_insert_input!]!) {
		user: insert_users(objects: $objects) {
			returning {
				...UserFragment
				twitter
				timestamp
			}
		}
	}
`

export const UPDATE_USER = gql`
	${USER_FRAGMENT}
	mutation updateUser($where: users_bool_exp!, $set: users_set_input) {
		update_users(where: $where, _set: $set) {
			returning {
				...UserFragment
				twitter
				timestamp
			}
		}
	}
`

export const DELETE_USER = gql`
	mutation Delete_users($where: users_bool_exp!) {
		delete_users(where: $where) {
			affected_rows
			returning {
				id
			}
		}
	}
`
