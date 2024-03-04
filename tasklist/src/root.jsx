import "./root.css";
import React, { useRef } from "react";

import Task from "./components/Task/Task";

const Root = () => {
    const taskRef = useRef(null);

    return (
        <>
            <div className="tasksList-row">
                <div className="tasks-list">
                    <div id="tasks">
                        <Task ref={taskRef} />
                    </div>
                    <div className="tasks-list__footer">
                        <h1>React TaskList</h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Root;