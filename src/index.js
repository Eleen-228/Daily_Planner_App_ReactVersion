import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<BrowserRouter basename="/Daily_Planner_App_ReactVersion">
			<App />
		</BrowserRouter>
	</React.StrictMode>
)
