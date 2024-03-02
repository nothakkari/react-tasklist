import React, { useState } from "react";
import TaskItem from "./TaskItem/TaskItem";

const Task = () => {
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        const newTask = {
            id: tasks.length + 1,
            title: "Task Name",
            description: "Task Description"
        };
        setTasks([...tasks, newTask]);
    };

    return (
        <div>
            <button onClick={addTask}>New Task</button>
            <ul>
                {tasks.map(task => (
                    <TaskItem key={task.id} title={task.title} description={task.description} />
                ))}
            </ul>
        </div>
    );
}

export default Task;
