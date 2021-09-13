import { render } from '@testing-library/react'
import { MemoryRouter, Route, RouteComponentProps } from 'react-router'
import Recoil from 'recoil'

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
