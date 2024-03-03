import "./Task.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ModalCreateTask from "../ModalCreateTask/ModalCreateTask.jsx"

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
    }, []);

    const handleTaskChange = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    };

    const addTask = (name, description) => {
        const newTask = {
            id: tasks.length + 1,
            title: name || "Task Name",
            description: description || "Task Description",
            done: false 
        };
    
        const updatedTasks = [...tasks, newTask];
        handleTaskChange(updatedTasks);
    
        setShowNewTaskModal(false);
    
        if (filter === "done" || filter === "undone") {
            setFilter("all");
        }
    };

    const handleCheckboxChange = (taskId, doneValue) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, done: doneValue };
            }
            return task;
        });

        handleTaskChange(updatedTasks);
    };

    const handleDeleteTask = (taskId) => {
        const updatedTasks = tasks.filter(task => task.id !== taskId);
        handleTaskChange(updatedTasks);
    };

    const handleFilterChange = (filterValue) => {
        setFilter(filterValue);
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === "done") {
            return task.done;
        } else if (filter === "undone") {
            return !task.done || task.id === tasks.length; // Исключаем новую задачу из фильтрации, пока она не будет изменена пользователем
        }
        return true;
    });

    return (
        <>
            <div>
                <button onClick={() => setShowNewTaskModal(true)} className="taskItem__button addTask">New Task</button>
                <div className="taskItem__filters">
                    <button onClick={() => handleFilterChange("all")} className={filter === "all" ? "active" : ""}>All</button>
                    <button onClick={() => handleFilterChange("done")} className={filter === "done" ? "active" : ""}>Done</button>
                    <button onClick={() => handleFilterChange("undone")} className={filter === "undone" ? "active" : ""}>Undone</button>
                </div>
                <ul className="taskItem__tasks">
                    {filteredTasks.length === 0 && (
                        <div className="taskItem__whenListEmpty">Нет активных задач</div>
                    )}
                    {filteredTasks.map(task => (
                        <li key={task.id} className="taskItem">
                            <div className="taskItem__info">
                                <label>
                                    <div className="taskItem__taskName">{task.title}</div>
                                    <div className="taskItem__taskDesc">{task.description}</div>
                                </label>
                            </div>
                            <div className="taskItem__status">
                                <label>
                                    <div className="taskItem__status checkbox">
                                        <input
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={() => handleCheckboxChange(task.id, !task.done)}
                                        />
                                        <span>Done</span>
                                    </div>
                                </label>
                                <label>
                                    <div className="taskItem__status checkbox">
                                        <input
                                            type="checkbox"
                                            checked={!task.done}
                                            onChange={() => handleCheckboxChange(task.id, !task.done)}
                                        />
                                        <span>Undone</span>
                                    </div>
                                </label>
                            </div>
                            <button className="taskItem__button edit">
                                <Link className="reactLink" to={`/${task.id}/edit`}>Edit</Link>
                            </button>
                            <button className="taskItem__button delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                            <button className="taskItem__button edit">
                                <Link className="reactLink" to={`/${task.id}`}>About Task</Link>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <ModalCreateTask show={showNewTaskModal} onClose={() => setShowNewTaskModal(false)} onSubmit={addTask} />
        </>
    );
}

export default Task;
