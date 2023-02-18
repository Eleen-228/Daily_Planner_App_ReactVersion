import React from 'react'
import { NavLink, Routes, Route } from 'react-router-dom'
import ToDo from './ToDo'
import InProgress from './InProgress'
import Done from './Done'
import './index.css'

export default function TaskListDashboard() {
	return (
		<div id="dashboard" className="col-12">
			<h2>
				<i className="fa-sharp fa-solid fa-list-check fa-2x"></i>
				Task List Dashboard
			</h2>
			<div className="row-12" id="taskList">
				<div className="col">
					<ul className="row statusTab px-0">
						<li>
							<NavLink
								to="/todo"
								className={({ isActive }) => {
									return isActive ? 'col showContent' : 'col'
								}}>
								<i className="fa-sharp fa-solid fa-table-list"></i>
								<span>To Do</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/inProgress"
								className={({ isActive }) => {
									return isActive ? 'showContent' : 'col'
								}}>
								<i className="fa-sharp fa-solid fa-spinner"></i>
								<span>In Progress</span>
							</NavLink>
						</li>
						<li>
							<NavLink
								to="/done"
								className={({ isActive }) => {
									return isActive ? 'showContent' : 'col'
								}}>
								<i className="fa-sharp fa-solid fa-square-check"></i>
								<span>Done</span>
							</NavLink>
						</li>
					</ul>

					<div className="row contentWindow">
						<Routes>
							<Route path="/todo" element={<ToDo />} />
							<Route path="/inProgress" element={<InProgress />} />
							<Route path="/done" element={<Done />} />
							<Route path="/" element={<ToDo />} />
						</Routes>
					</div>
				</div>
			</div>
		</div>
	)
}
