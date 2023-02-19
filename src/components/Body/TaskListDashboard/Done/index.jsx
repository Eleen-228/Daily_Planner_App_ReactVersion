import React, { useState, useEffect } from 'react'
import PubSub from 'pubsub-js'
/* Done function component */
export default function Done() {
	/* declare and initializing emptyTaskMessage */
	const emptyTaskMessage = (
		<li className="message">
			<p>
				<i className=" fa-sharp fa-solid fa-bell"></i>No task card has been added to this list yet.
			</p>
		</li>
	)
	/* declare and initializing done tab state  */
	const [doneListArray, setDoneList] = useState(JSON.parse(localStorage.getItem('doneList')) || [])
	useEffect(() => {
		PubSub.subscribe('doneList', (_, doneData) => {
			setDoneList(doneData)
		})
	})

	/* todo button function */
	const handleTodo = Id => {
		const cardToBeSwitched = doneListArray.find(doneItem => doneItem.taskId === Id)
		const doneIndex = doneListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToTodo = doneListArray.splice(doneIndex, 1)
		PubSub.publish('updatedDoneList', doneListArray)
		PubSub.publish('newTodoCard', cardSwitchedToTodo)
	}
	/* inProgress button function */
	const handleInProgress = Id => {
		const cardToBeSwitched = doneListArray.find(doneItem => doneItem.taskId === Id)
		const doneIndex = doneListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToInProg = doneListArray.splice(doneIndex, 1)
		PubSub.publish('updatedDoneList', doneListArray)
		PubSub.publish('newInProgressCard', cardSwitchedToInProg)
	}
	/* delete button function */
	const handleDelete = Id => {
		const cardToBeDeleted = doneListArray.find(doneItem => doneItem.taskId === Id)
		const doneIndex = doneListArray.indexOf(cardToBeDeleted)
		doneListArray.splice(doneIndex, 1)
		PubSub.publish('updatedDoneList', doneListArray)
	}
	return (
		<ul className="col done">
			{doneListArray.length > 0
				? doneListArray.map(doneItem => {
						const { taskName, description, assignedTo, dueDate, taskId } = doneItem
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
											handleInProgress(taskId)
										}}>
										<i className="fa-sharp fa-solid fa-spinner"></i>
										<span>In Progress</span>
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
