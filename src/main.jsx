import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter as Router} from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
    </Router>
)
