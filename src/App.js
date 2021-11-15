import { createContext, useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import UsersList from './components/usersList/usersList'
import './App.css'
import UsersPage from './components/userPage/userPage'
import { RenderIf } from './utils'

export const Context = createContext()

const client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache: new InMemoryCache(),
})

function App() {
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
					<UsersList />
					<RenderIf condition={selectedUser}>
						<UsersPage />
					</RenderIf>
				</div>
			</ApolloProvider>
		</Context.Provider>
	)
}

export default App
