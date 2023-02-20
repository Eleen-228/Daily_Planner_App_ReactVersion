import React, { useEffect, useRef } from 'react'
import NewTask from '../NewTask'
import TaskListDashboard from '../TaskListDashboard'
import './index.css'
export default function Header() {
	const newTaskRef = useRef(null)
	const taskListRef = useRef(null)
	const scrollToAnchor = e => {
		const navLink = e.target
		const anchorName = navLink.name
		if (anchorName === 'newTask') {
			const anchorToElement = document.getElementById(anchorName)
			if (anchorToElement) {
				navLink.ownerDocument.anchors.taskList.classList.remove('active')
				navLink.classList.add('active')
				anchorToElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
			}
		}
		if (anchorName === 'taskList') {
			const anchorToElement = document.getElementById(anchorName)
			if (anchorToElement) {
				navLink.ownerDocument.anchors.newTask.classList.remove('active')
				navLink.classList.add('active')
				anchorToElement.scrollIntoView({ block: 'start', behavior: 'smooth' })
			}
		}
	}
	useEffect(() => {
		window.addEventListener('scroll', function () {
			if (this.scrollY < newTaskRef.current.clientHeight) {
				taskListRef.current.classList.remove('active')
				newTaskRef.current.classList.add('active')
			} else if (this.scrollY >= newTaskRef.current.clientHeight) {
				newTaskRef.current.classList.remove('active')
				taskListRef.current.classList.add('active')
			}
		})
	})
	return (
		<>
			<div className="col " id="header">
				<nav className="navbar navbar-expand-lg navbar-dark bg-secondary fixed-top">
					<h1>
						Daily Planner_ _ _<i className="fa-sharp fa-solid fa-pen"></i>
					</h1>

					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto" onClick={scrollToAnchor}>
							<li className="nav-item">
								<a className="nav-link active" name="newTask" ref={newTaskRef}>
									<i className="fa-sharp fa-solid fa-calendar-days"></i>New Task
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" name="taskList" ref={taskListRef}>
									<i className="fa-sharp fa-solid fa-list-check"></i>Task List Dashboard
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</div>
			<NewTask id="newTask" />
			<TaskListDashboard id="taskListDashboard" />
		</>
	)
}
