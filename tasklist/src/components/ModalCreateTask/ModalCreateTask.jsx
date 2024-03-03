import "./ModalCreateTask.css";
import "../Task/Task.css";

import React, { useState } from "react";

const ModalCreateTask = ({ show, onClose, onSubmit }) => {
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");

    const handleAddTask = () => {
        onSubmit(newTaskName, newTaskDescription);
        setNewTaskName(""); // Очищаем значение поля Name после создания задачи
        setNewTaskDescription(""); // Очищаем значение поля Description после создания задачи
    };

    return (
        <>
            {show && (
                <div className="modal-overlay">
                    <div className="modal">
                        <span className="close" onClick={onClose}>&times;</span>
                        <h2>New Task</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                        />
                        <button className="taskItem__button modalBtn" onClick={handleAddTask}>Create Task</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalCreateTask;
