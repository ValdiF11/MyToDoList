import React, { useContext, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/mainLayout";

const TaskInputForm = () => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const navigate = useNavigate();
  const useAuth = () => useContext(UserContext);
  const { user } = useAuth();
  console.log(user);
  const handleAddTask = async () => {
    if (task.trim() === "") return;
    await addDoc(collection(db, "tasks"), {
      task,
      completed: false,
      userId: user.uid, // Replace with the actual user ID
      taskDate,
    });
    navigate("/");
  };

  return (
    <div className="task-input-form-container container">
      <h2 className="text-center my-4">Add New Task</h2>
      <div className="input-group mb-3">
        <span className="input-group-text">Task</span>
        <input type="text" className="form-control" placeholder="Task" value={task} onChange={(e) => setTask(e.target.value)} />
      </div>
      <div className="input-group mb-3">
        <span className="input-group-text">Date & Time</span>
        <input type="datetime-local" className="form-control" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} />
      </div>
      <div className="text-center">
        <button className="btn btn-primary" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TaskInputForm;
