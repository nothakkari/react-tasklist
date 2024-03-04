import "./Task.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import ModalCreateTask from "../ModalCreateTask/ModalCreateTask.jsx"

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [undoneTasks, setUndoneTasks] = useState([]);
    const [doneTasks, setDoneTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [showNewTaskModal, setShowNewTaskModal] = useState(false); 

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        setTasks(storedTasks);
        setUndoneTasks(storedTasks.filter(task => !task.done));
        setDoneTasks(storedTasks.filter(task => task.done));
    }, []);

    const handleTaskChange = (updatedTasks) => {
        setTasks(updatedTasks);
        setUndoneTasks(updatedTasks.filter(task => !task.done));
        setDoneTasks(updatedTasks.filter(task => task.done));
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

    const handleCheckboxChange = (taskId) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId) {
                return { ...task, done: !task.done };
            }
            return task;
        });
    
        handleTaskChange(updatedTasks);
    
        if (filter === "done") {
            setDoneTasks(updatedTasks.filter(task => task.done));
            setUndoneTasks(updatedTasks.filter(task => !task.done));
        } else if (filter === "undone") {
            setDoneTasks(updatedTasks.filter(task => task.done));
            setUndoneTasks(updatedTasks.filter(task => !task.done || (task.done && task.id === updatedTasks.length)));
        }
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
            return !task.done;
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
                                    <div className="taskItem__taskDesc"><span>{task.description}</span></div>
                                </label>
                            </div>
                            <div className="taskItem__status">
                                <label>
                                    <div className="taskItem__status checkbox">
                                        <input
                                            type="checkbox"
                                            checked={task.done}
                                            onChange={() => handleCheckboxChange(task.id)}
                                        />
                                        <span>Done</span>
                                    </div>
                                </label>
                                <label>
                                    <div className="taskItem__status checkbox">
                                        <input
                                            type="checkbox"
                                            checked={!task.done}
                                            onChange={() => handleCheckboxChange(task.id)}
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