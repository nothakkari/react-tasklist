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
    <div>
      <h1>About Task</h1>
      {task && (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
        </div>
      )}
      <Link to="/">Back to Tasks</Link>
    </div>
  );
}

export default AboutTask;
