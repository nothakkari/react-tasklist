import "../styles/EditTask.css"

import { useParams, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react"

const EditTask = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();

    const [task, setTask] = useState(null);
    const [editedTask, setEditedTask] = useState({ title: "", description: "" });
    const [originalTask, setOriginalTask] = useState({ title: "", description: "" });

    useEffect(() => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const selectedTask = tasks.find(task => task.id === parseInt(taskId));
        if (selectedTask) {
            setTask(selectedTask);
            setEditedTask(selectedTask);
            setOriginalTask(selectedTask);
        }
    }, [taskId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: value });
    };

    const handleSave = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.map(t => (t.id === task.id ? editedTask : t));
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
        setOriginalTask(editedTask);
        navigate("/");
    };

    if(!task) {
        return <div>Loading...</div>
    }

    return (
        <div className="edit-task-menu">
            <h1>Edit Task #{task.id}</h1>
            <div className="edit-task-menu__taskInfo">
                <p>Task Name: {originalTask.title}</p>
                <p className="PrevTaskDesc">Description: <span>{originalTask.description}</span></p>
            </div>
            <div className="edit-task-menu__taskChange">
                <form onSubmit={handleSave}>
                    <div className="edit-task-menu__taskChange taskName">
                        <label>Title:</label>
                        <input 
                            type="text" 
                             name="title" 
                            value={editedTask.title}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="edit-task-menu__taskChange taskDesc">
                        <label>Description:</label>
                        <textarea 
                            name="description"
                            value={editedTask.description}
                            onChange={handleInputChange} 
                        />
                    </div>
                    <button type="submit">Save</button>
                </form>
                <button className="returnToTasks"><Link className="reactLink" to="/">Back to Tasks</Link></button>
            </div>
            
        </div>
    );
}

export default EditTask;
