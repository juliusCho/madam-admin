import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { render } from '@testing-library/react'
import { connectAuthEmulator } from 'firebase/auth'
import firebase from 'firebase/compat/app'
import fs from 'fs'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router'
import Recoil from 'recoil'
import endpoints from './endpoints.config'
import auth from './firebaseSetup'

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

export const connectEmulator = () => {
  connectAuthEmulator(auth, `http://localhost:${TEST_EMUL_AUTH_PORT}`, {
    disableWarnings: true,
  })
}

export const initializeFirestoreTestEnv = async () => {
  const path = '/../firestore.rules'

  return initializeTestEnvironment({
    projectId: endpoints.firebase.apiKey,
    firestore: {
      rules: fs.readFileSync(__dirname + path, 'utf8'),
      host: 'localhost',
      port: TEST_EMUL_STORE_PORT,
    },
  })
}

const startEmulator = (firestore: firebase.firestore.Firestore) => {
  connectAuthEmulator(
    firestore.app.auth(),
    `http://localhost:${TEST_EMUL_AUTH_PORT}`,
    {
      disableWarnings: true,
    },
  )
  firestore.app.auth().useEmulator(`http://localhost:${TEST_EMUL_AUTH_PORT}`)
  firestore.useEmulator('localhost', TEST_EMUL_STORE_PORT)
}

export const firestoreTestAuthenticate = (env: RulesTestEnvironment) => {
  const context = env.authenticatedContext(endpoints.test.uid)
  startEmulator(context.firestore())
  return context
}

export const firestoreTestUnauthenticate = (env: RulesTestEnvironment) => {
  const context = env.unauthenticatedContext()
  startEmulator(context.firestore())
  return context
}

export const firestoreCleanup = async (env: RulesTestEnvironment) => {
  await env.cleanup()
}
