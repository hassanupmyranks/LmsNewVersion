import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import './const/V2/icons'
import reportWebVitals from './reportWebVitals'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'
import 'react-calendar/dist/Calendar.css'
import 'react-widgets/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
