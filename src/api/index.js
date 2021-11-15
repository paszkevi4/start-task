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
		users_by_pk(id: $userId) {
			id
			name
			rocket
			twitter
			timestamp
		}
	}
`
