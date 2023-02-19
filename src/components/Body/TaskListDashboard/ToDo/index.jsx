import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'
import '../index.css'
/* ToDo function component */
export default function ToDo() {
	/* declare and initializing emptyTaskMessage */
	const emptyTaskMessage = (
		<li className="message">
			<p>
				<i className=" fa-sharp fa-solid fa-bell"></i>No task card has been added to this list yet.
			</p>
		</li>
	)
	/* declare and initializing todo tab state */
	const [todoListArray, setTodoList] = useState(JSON.parse(localStorage.getItem('todoList')) || [])
	const navigate = useNavigate()
	useEffect(() => {
		PubSub.subscribe('todoList', (_, todoData) => {
			setTodoList(todoData) //直接传新的状态值就会把这个值更新为todoListArray的值
		})
	})
	useEffect(() => {
		/* navigate to todo tab when pathname is "/" and todo tab was active before page refresh*/
		navigate('/todo')
	}, [])

	/* inProgress button function */
	const handleInProgress = Id => {
		const cardToBeSwitched = todoListArray.find(todoItem => todoItem.taskId === Id)
		const todoIndex = todoListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToInProg = todoListArray.splice(todoIndex, 1)
		PubSub.publish('updatedTodoList', todoListArray)
		PubSub.publish('newInProgressCard', cardSwitchedToInProg)
	}
	/* done button function */
	const handleDone = Id => {
		const cardToBeSwitched = todoListArray.find(todoItem => todoItem.taskId === Id)
		const todoIndex = todoListArray.indexOf(cardToBeSwitched)
		const cardSwitchedToDone = todoListArray.splice(todoIndex, 1)
		PubSub.publish('updatedTodoList', todoListArray)
		PubSub.publish('newDoneCard', cardSwitchedToDone)
	}
	/* delete button function */
	const handleDelete = Id => {
		const cardToBeDeleted = todoListArray.find(todoItem => todoItem.taskId === Id)
		const todoIndex = todoListArray.indexOf(cardToBeDeleted)
		todoListArray.splice(todoIndex, 1)
		PubSub.publish('updatedTodoList', todoListArray)
	}
	return (
		<ul className="col toDo">
			{todoListArray.length > 0
				? todoListArray.map(todoItem => {
						const { taskName, description, assignedTo, dueDate, taskId } = todoItem
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
											handleInProgress(taskId)
										}}>
										<i className="fa-sharp fa-solid fa-spinner"></i>
										<span>In Progress</span>
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
