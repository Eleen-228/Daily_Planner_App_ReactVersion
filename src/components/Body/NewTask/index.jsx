import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PubSub from 'pubsub-js'
import './index.css'
const nanoId = require('nano-id')
let todoList = []
let inProgressList = []
let doneList = []
/* declare and initialize 3 state initial values */
const todoInitialValue = JSON.parse(localStorage.getItem('todoList')) || []
const inProgressInitialValue = JSON.parse(localStorage.getItem('inProgressList')) || []
const doneInitialValue = JSON.parse(localStorage.getItem('doneList')) || []
/* NewTask function component */
export default function NewTask() {
	/* get form DOM and taskStatus DOM using useRef hook  */
	const taskStatusRef = useRef(null)

	/* initializing 3 states using useState hook */
	const [todo, setTodo] = useState(todoInitialValue)
	const [inProgress, setInProgress] = useState(inProgressInitialValue)
	const [done, setDone] = useState(doneInitialValue)
	const [showTab, setShowTab] = useState(null)
	const navigate = useNavigate()
	/* declare and initializing 3 lists */

	/* submit button function */
	const handleAdd = e => {
		console.log(e)
		e.preventDefault()
		let todoCard = {}
		let inProgressCard = {}
		let doneCard = {}
		if (taskStatusRef.current.value === 'To Do') {
			for (let i = 0; i < e.target.length - 1; i++) {
				todoCard[e.target[i].id] = e.target[i].value
			}
			todoCard['taskId'] = nanoId()
			todoList = todo
			todoList.unshift(todoCard)
			setTodo([...todoList])
			setShowTab('todoTab')
		}
		if (taskStatusRef.current.value === 'In Progress') {
			for (let i = 0; i < e.target.length - 1; i++) {
				inProgressCard[e.target[i].id] = e.target[i].value
			}
			inProgressCard['taskId'] = nanoId()
			inProgressList = inProgress
			inProgressList.unshift(inProgressCard)
			setInProgress([...inProgressList])
			setShowTab('inProgressTab')
		}
		if (taskStatusRef.current.value === 'Done') {
			for (let i = 0; i < e.target.length - 1; i++) {
				doneCard[e.target[i].id] = e.target[i].value
			}
			doneCard['taskId'] = nanoId()
			doneList = done
			doneList.unshift(doneCard)
			setDone([...doneList])
			setShowTab('doneTab')
		}
		e.target.reset()
	}
	useEffect(() => {
		/* publish todo state to todo tab */
		PubSub.publish('todoList', todo)
		/* publish inProgress state to inProgress tab */
		PubSub.publish('inProgressList', inProgress)
		/* publish done state to done tab */
		PubSub.publish('doneList', done)
		/* save latest state to localStorage */
		localStorage.setItem('todoList', JSON.stringify(todo))
		/* save latest state to localStorage */
		localStorage.setItem('inProgressList', JSON.stringify(inProgress))
		/* save latest state to localStorage */
		localStorage.setItem('doneList', JSON.stringify(done))
		/* subscribe updated todo list state from 3 status tabs */
		PubSub.subscribe('updatedTodoList', (_, updatedTodoData) => {
			setTodo([...updatedTodoData])
		})
		/* subscribe updated inProgress list state from 3 status tabs */
		PubSub.subscribe('updatedInProgressList', (_, updatedInProgressData) => {
			setInProgress([...updatedInProgressData])
		})
		/* subscribe updated done list state from 3 status tabs */
		PubSub.subscribe('updatedDoneList', (_, updatedDoneData) => {
			setDone([...updatedDoneData])
		})
		/* subscribe new inProgress data switched from todo tab */
		PubSub.subscribe('newInProgressCard', (_, inProgressDataToAdd) => {
			setInProgress([...inProgressDataToAdd, ...inProgress])
		})
		/* subscribe new done data switched from todo tab */
		PubSub.subscribe('newDoneCard', (_, doneDataToAdd) => {
			setDone([...doneDataToAdd, ...done])
		})
		/* subscribe new todo data switched from inProgress tab */
		PubSub.subscribe('newTodoCard', (_, todoDataToAdd) => {
			setTodo([...todoDataToAdd, ...todo])
		})
	}, [todo, inProgress, done])
	/* navigate to that particular status tab per task status added */
	useEffect(() => {
		switch (showTab) {
			case 'todoTab':
				navigate('/todo')
				break
			case 'inProgressTab':
				navigate('/inProgress')
				break
			case 'doneTab':
				navigate('/done')
				break
			default:
				navigate('/todo')
		}
	}, [showTab])

	return (
		<form className="col-12" id="newTask" onSubmit={handleAdd}>
			<h2>
				<i className="fa-sharp fa-solid fa-calendar-days fa-2x"></i>
				Add New Task
			</h2>
			<div className="form-group row">
				<label htmlFor="taskName" className="col-sm-2 col-form-label">
					<i className="fa-sharp fa-solid fa-thumbtack"></i>Task Name:
				</label>
				<div className="col-sm-5">
					<input type="text" className="form-control" id="taskName" required />
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="description" className="col-sm-2 col-form-label">
					<i className="fa-sharp fa-solid fa-paperclip"></i>Task Description:
				</label>
				<div className="col-sm-10">
					<textarea className="form-control" id="description" rows="4" required></textarea>
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="assignedTo" className="col-sm-2 col-form-label">
					<i className="fa-sharp fa-solid fa-user"></i>Assigned to:
				</label>
				<div className="col-sm-2">
					<input type="text" className="form-control" id="assignedTo" required />
				</div>
				<label htmlFor="dueDate" className="col-sm-2 col-form-label">
					<i className="fa-sharp fa-solid fa-calendar-week"></i>Due Date:
				</label>
				<div className="col-sm-3">
					<input type="date" className="form-control" id="dueDate" required />
				</div>
			</div>
			<div className="form-group row">
				<label htmlFor="taskStatus" className="col-sm-2 col-form-label">
					<i className="fa-sharp fa-solid fa-check"></i>Status:
				</label>
				<div className="col-sm-2 w-50">
					<select className="custom-select" id="taskStatus" ref={taskStatusRef} required>
						<option value="">Chose One</option>
						<option value="To Do">To Do</option>
						<option value="In Progress">In Progress</option>
						<option value="Done">Done</option>
					</select>
				</div>
			</div>
			<div className="form-group row justify-content-center">
				<div className="col-sm-6 text-center">
					<button type="submit" className="btn btn-primary forSubmit">
						<i className="fa-sharp fa-solid fa-plus"></i>
					</button>
				</div>
			</div>
		</form>
	)
}
