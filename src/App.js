import { createContext, useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './App.css'
import { RenderIf } from './utils'

import UsersList from './components/usersList/usersList'
import UsersPage from './components/userPage/userPage'
import CreateUserModal from './components/createUserModal/createUserModal'

export const Context = createContext()

const client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache: new InMemoryCache(),
})

function App() {
	const [isModalOpen, stIsModalOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState('')
	return (
		<Context.Provider
			value={{
				selectedUser,
				setSelectedUser,
			}}
		>
			<ApolloProvider client={client}>
				<div className='app'>
					<UsersList toggleIsModalOpen={() => stIsModalOpen(true)} />
					<RenderIf condition={selectedUser}>
						<UsersPage />
					</RenderIf>
					<RenderIf condition={isModalOpen}>
						<CreateUserModal
							toggleIsOpen={() => stIsModalOpen(false)}
						/>
					</RenderIf>
				</div>
			</ApolloProvider>
		</Context.Provider>
	)
}

export default App
