import React from 'react'
import NewTask from './NewTask'
import TaskListDashboard from './TaskListDashboard'

export default function Body() {
	return (
		<div id="body">
			<NewTask />
			<TaskListDashboard />
		</div>
	)
}
