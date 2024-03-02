import "../root.css";
import React, { useState, useRef } from "react";

import Task from "../components/Task/Task";

const Root = () => {
    const taskRef = useRef(null);

    const addTask = () => {
        if (taskRef.current) {
            taskRef.current.addTask();
        }
    };

    return (
        <>
            <div className="tasks-list">
                <div className="tasks-list__header">
                    <h1>To Do List</h1>
                </div>
                <div id="tasks">
                    <Task ref={taskRef} />
                </div>
            </div>
        </>
    );
}

export default Root;