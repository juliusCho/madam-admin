import {
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing'
import { render } from '@testing-library/react'
import firebase from 'firebase/compat/app'
import fs from 'fs'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router'
import Recoil from 'recoil'
import endpoints from './endpoints.config'

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

export const initializeFirestoreTestEnv = async () => {
  const path = '/../firestore.rules'

  return initializeTestEnvironment({
    projectId: endpoints.firebase.apiKey,
    firestore: {
      rules: fs.readFileSync(__dirname + path, 'utf8'),
      host: 'localhost',
      port: 8080,
    },
  })
}

const startEmulator = (firestore: firebase.firestore.Firestore) => {
  firestore.app.auth().useEmulator(`http://localhost:${9099}`)
  firestore.useEmulator('localhost', 8080)
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

export const initializeTestEnvAuth = async (env: RulesTestEnvironment) => {
  const context = firestoreTestAuthenticate(env)
  const firestore = context.firestore()
  const auth = firestore.app.auth()
  return { firestore, auth }
}

export const initializeTestEnvUnauth = async (env: RulesTestEnvironment) => {
  const context = firestoreTestUnauthenticate(env)
  const firestore = context.firestore()
  const auth = firestore.app.auth()
  return { firestore, auth }
}
