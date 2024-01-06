import React, { useState, useEffect } from "react";
import "./styles.css"; 
import { createTask } from "../services/taskService";

const NewTaskModal = ({ show, handleClose }) => {
  const [taskName, setTaskName] = useState("");

  useEffect(() => {
    if (!show) {
      setTaskName("");
    }
  }, [show]);

  const handleCreateTask = async () => {
    let res = await createTask({title: taskName});
    if (res) {
      handleClose();
    }
    setTaskName("");
  };

  return (
    <>
      {show && (
        <div className="backdrop">
          <div className={`modal ${show ? "show" : ""}`} style={{ display: show ? "block" : "none" }}>
            <div className="modal-dialog">
              <div className="modal-content" style={{ background: '#FFFAF4' }}>
                <div className="modal-header" >
                  <h5 className="modal-title">Create New Task</h5>
                  <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                </div>
                <div className="modal-body custom-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="taskName" className="form-label">Task Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="taskName"
                        placeholder="Enter task title"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleCreateTask}>Create Task</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewTaskModal;
