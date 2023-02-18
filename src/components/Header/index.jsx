import React from 'react'

import './index.css'
export default function Header() {
	return (
		<div className="col " id="header">
			<nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
				<a className="navbar-brand" href="#body">
					<h1>
						Daily Planner_ _ _<i className="fa-sharp fa-solid fa-pen"></i>
					</h1>
				</a>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarSupportedContent"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation">
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					<ul className="navbar-nav ml-auto">
						<li className="nav-item">
							<a className="nav-link active" href="#newTask">
								<i className="fa-sharp fa-solid fa-calendar-days"></i>New Task
							</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" href="#taskList">
								<i className="fa-sharp fa-solid fa-list-check"></i>Task List Dashboard
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	)
}
