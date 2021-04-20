import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

import axios from 'axios'

function App() {
  const [showAddTask, setShowAddtask] = useState(false)
  const [tasks, setTasks] = useState([
    {
      "id": 1,
      "text": "Doctors Appointment",
      "day": "Feb 5th at 2:30pm",
      "reminder": true
    },
    {
      "id": 2,
      "text": "Meeting at School",
      "day": "Feb 6th at 1:30pm",
      "reminder": false
    }])

  //updating database
  const updateData = (data) => {
    axios.post('http://localhost:5000/createtask', data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    updateData(tasks);
  }

  //Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ?
      { ...task, reminder: !task.reminder } : task))
      updateData(tasks);

  }

  //Add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 1000) + 1
    const newTask = { id, ...task }

    setTasks([...tasks, newTask])

    updateData(tasks);

  }

  return (
    <div className='container'>
      <Header
        title="Task App"
        onAdd={() => setShowAddtask(!showAddTask)}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ?
        <Tasks tasks={tasks}
          onDelete={deleteTask}
          onToggle={toggleReminder}
        /> :
        "No task available"
      }
    </div>
  );
}

export default App;
