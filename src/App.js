import { useState } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import './App.css'
import { RenderIf } from './utils'
import { BrowserRouter, Route } from 'react-router-dom'

import UsersList from './components/usersList/usersList'
import UsersPage from './components/userPage/userPage'
import CreateUserModal from './components/createUserModal/createUserModal'

const client = new ApolloClient({
	uri: 'https://api.spacex.land/graphql/',
	cache: new InMemoryCache(),
})

function App() {
	const [isModalOpen, stIsModalOpen] = useState(false)
	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<div className='app'>
					<UsersList toggleIsModalOpen={() => stIsModalOpen(true)} />
					<Route path='/user/:userId' component={UsersPage} />
					<RenderIf condition={isModalOpen}>
						<CreateUserModal
							toggleIsOpen={() => stIsModalOpen(false)}
						/>
					</RenderIf>
				</div>
			</BrowserRouter>
		</ApolloProvider>
	)
}

export default App
