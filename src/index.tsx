import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal'
import { BrowserRouter } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import './index.css'
import App from './pages/App'
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
