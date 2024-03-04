import "../styles/AboutTask.css";

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AboutTask = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const foundTask = storedTasks.find(task => task.id === parseInt(taskId));
    setTask(foundTask);
  }, [taskId]);

  return (
    <div className="about-task">
      <h1>About Task</h1>
      {task && (
        <div className="about-task__info">
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      )}
      <button><Link className="reactLink" to="/">Back to Tasks</Link></button>
    </div>
  );
}

export default AboutTask;
