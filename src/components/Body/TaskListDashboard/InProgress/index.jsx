import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'
/* InProgress function component*/
export default function InProgress() {
	/* declare and initializing emptyTaskMessage */
	const emptyTaskMessage = (
		<li className="message">
			<p>
				<i className=" fa-sharp fa-solid fa-bell"></i>No task card has been added to this list yet.
			</p>
		</li>
	)
	/* declare and initializing inProgress tab state  */
	const [inProgressListArray, setInProgressList] = useState(JSON.parse(localStorage.getItem('inProgressList')) || [])
	useEffect(() => {
		PubSub.subscribe('inProgressList', (_, inProgressData) => {
			setInProgressList(inProgressData)
		})
	})
	// const navigate = useNavigate()
	// useEffect(() => {
	// 	/* navigate to inProgress tab when inProgress tab was active before page refresh*/
	// 	navigate('/inProgress')
	// }, [])
	/* todo button function */
	const handleTodo = Id => {
		const cardToBeSwitched = inProgressListArray.find(inProgressItem => inProgressItem.taskId === Id)
		const inProgressIndex = inProgressListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToTodo = inProgressListArray.splice(inProgressIndex, 1)
		PubSub.publish('updatedInProgressList', inProgressListArray)
		PubSub.publish('newTodoCard', cardSwitchedToTodo)
	}
	/* done button function */
	const handleDone = Id => {
		const cardToBeSwitched = inProgressListArray.find(inProgressItem => inProgressItem.taskId === Id)
		const inProgressIndex = inProgressListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToDone = inProgressListArray.splice(inProgressIndex, 1)
		PubSub.publish('updatedInProgressList', inProgressListArray)
		PubSub.publish('newDoneCard', cardSwitchedToDone)
	}
	/* delete button function */
	const handleDelete = Id => {
		const cardToBeDeleted = inProgressListArray.find(inProgressItem => inProgressItem.taskId === Id)
		const inProgressIndex = inProgressListArray.indexOf(cardToBeDeleted)
		inProgressListArray.splice(inProgressIndex, 1)
		PubSub.publish('updatedInProgressList', inProgressListArray)
	}

	return (
		<ul className="col inProgress">
			{inProgressListArray.length > 0
				? inProgressListArray.map(inProgressItem => {
						const { taskName, description, assignedTo, dueDate, taskId } = inProgressItem
						let todayDate = new Date()
						todayDate = `${todayDate.getFullYear()}-${todayDate.getMonth() + 1}-${todayDate.getDate()}`
						return (
							<li key={taskId} className="cardAdded row">
								<div className="col">
									<div>Task Name: {taskName}</div>
									<div>Assigned To: {assignedTo}</div>
									<div>Description: {description} </div>
								</div>
								<div className="col">
									<div>Date Assigned: {todayDate}</div>
									<div>Due Date: {dueDate}</div>
								</div>
								<div className="col">
									<button
										type="button"
										className="btn btn-warning"
										onClick={() => {
											handleTodo(taskId)
										}}>
										<i className="fa-sharp fa-solid fa-table-list"></i>
										<span>To Do</span>
									</button>
									<button
										type="button"
										className="btn btn-success"
										onClick={() => {
											handleDone(taskId)
										}}>
										<i className="fa-sharp fa-solid fa-square-check"></i>
										<span>Done</span>
									</button>
									<button
										type="button"
										className="btn btn-danger"
										onClick={() => {
											handleDelete(taskId)
										}}>
										<i className="fa-sharp fa-solid fa-trash"></i>
										<span>Delete</span>
									</button>
								</div>
							</li>
						)
				  })
				: emptyTaskMessage}
		</ul>
	)
}
