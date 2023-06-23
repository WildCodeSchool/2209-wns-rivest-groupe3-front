import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  ApolloLink,
  from,
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'

import { useContext } from 'react'

import App from './App'
import { ErrorContext } from './contexts/ErrorContext'

function AppWrapper() {
  const { setError } = useContext(ErrorContext)

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.forEach((error) => {
        console.error(error)
        // console.error(
        //   `[GraphQL error]: Message: ${error.message}, Location: ${error.locations}, Path: ${error.path}`
        // )
        setError(error)
      })
    if (networkError) console.error(`[Network error]: ${networkError}`)
  })

  const httpLink = createHttpLink({
    uri: import.meta.env.VITE_API_URL,
  })

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: localStorage.getItem('token') || '',
      },
    }))

    return forward(operation)
  })

  const appLink = from([errorLink, authMiddleware, httpLink])

  const client = new ApolloClient({
    link: appLink,
    cache: new InMemoryCache({
      addTypename: false,
    }),
  })

  return (
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  )
}

export default AppWrapper
