// Import the necessary hook from react-router-dom
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
        setOriginalTask(editedTask); // Обновляем оригинальные данные
        navigate("/"); // Перенаправляем обратно к списку задач
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Edit Task {task.id}</h1>
            <p>Original Title: {originalTask.title}</p>
            <p>Original Description: {originalTask.description}</p>
            <form onSubmit={handleSave}>
                <div>
                    <label>Title:</label>
                    <input 
                        type="text" 
                        name="title" 
                        value={editedTask.title}
                        onChange={handleInputChange} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        name="description"
                        value={editedTask.description}
                        onChange={handleInputChange} 
                    />
                </div>
                <button type="submit">Save</button>
            </form>
            <Link to="/">Back to Tasks</Link>
        </div>
    );
}

export default EditTask;
