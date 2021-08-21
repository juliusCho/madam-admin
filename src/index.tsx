import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './firebaseSetup'
import './index.css'
import './index.tailwind.css'
import { App } from './pages'
import reportWebVitals from './reportWebVitals'

Modal.setAppElement('#root')

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
