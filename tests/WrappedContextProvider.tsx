// Keep React import to avoid TS issue
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { UserProvider } from '../src/contexts/UserContext'
import { NotificationProvider } from '../src/contexts/NotificationContext'
import { ModalProvider } from '../src/contexts/ModalContext'
import { mocks } from './mocks.js'

export const WrappedContextProvider = ({
  children,
}: {
  children: JSX.Element
}) => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <NotificationProvider>
        <UserProvider>
          <ModalProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </ModalProvider>
        </UserProvider>
      </NotificationProvider>
    </MockedProvider>
  )
}
