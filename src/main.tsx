import ReactDOM from 'react-dom/client'
import './index.css'
import AppWrapper from './AppWrapper'

import { UserProvider } from './contexts/UserContext'
import { NotificationProvider } from './contexts/NotificationContext'
import { ModalProvider } from './contexts/ModalContext'
import { ErrorProvider } from './contexts/ErrorContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ErrorProvider>
    <NotificationProvider>
      <UserProvider>
        <ModalProvider>
          <AppWrapper />
        </ModalProvider>
      </UserProvider>
    </NotificationProvider>
  </ErrorProvider>
)
