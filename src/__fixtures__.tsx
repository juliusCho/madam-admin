import { render } from '@testing-library/react'
import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router'
import Recoil from 'recoil'
import endpoints from './endpoints.config'

const TEST_EMUL_AUTH_PORT = 9099
const TEST_EMUL_STORE_PORT = 8080

export const renderPage = (
  endpoint: string,
  component: (props: RouteComponentProps) => JSX.Element,
) =>
  render(
    <Recoil.RecoilRoot>
      <MemoryRouter initialEntries={[endpoint]}>
        <Route path={endpoint} component={component} />
      </MemoryRouter>
    </Recoil.RecoilRoot>,
  )

export const initializeTestFirebase = () => {
  const app = initializeApp(endpoints.firebase)
  const auth = getAuth(app)
  const db = getFirestore(app)

  connectAuthEmulator(auth, `http://localhost:${TEST_EMUL_AUTH_PORT}`, {
    disableWarnings: true,
  })
  connectFirestoreEmulator(db, 'localhost', TEST_EMUL_STORE_PORT)

  return { app, auth, db }
}
