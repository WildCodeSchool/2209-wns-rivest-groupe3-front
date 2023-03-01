import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { UserProvider } from './contexts/UserContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ModalProvider } from './contexts/ModalContext'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/',
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <NotificationProvider>
        <UserProvider>
          <ModalProvider>
            <App />
          </ModalProvider>
        </UserProvider>
      </NotificationProvider>
    </ApolloProvider>
  </React.StrictMode>
)
