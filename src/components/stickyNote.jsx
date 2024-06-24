import React, { useRef, useEffect } from "react";

const StickyNote = ({ day, tasks, toggleComplete }) => {
  const getColorByDay = (day) => {
    switch (day) {
      case "Sunday":
        return "#FFCCCB";
      case "Monday":
        return "#F0E68C";
      case "Tuesday":
        return "#98FB98";
      case "Wednesday":
        return "#ADD8E6";
      case "Thursday":
        return "#FFD700";
      case "Friday":
        return "#FFA07A";
      case "Saturday":
        return "#F08080";
      default:
        return "#6C757D";
    }
  };

  const backgroundColor = getColorByDay(day);

  return (
    <div className="col-md-4 mb-4">
      <div className="card" style={{ backgroundColor, minHeight: `20vh` }}>
        <div className="card-body">
          <h5 className="card-title text-center">{day}</h5>
          <ul className="list-group">
            {tasks.map((task) => (
              <li key={task.id} className={`list-group-item ${task.completed ? "checkbox-done" : ""}`}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <input type="checkbox" checked={task.completed} onChange={() => toggleComplete(task.id, task.completed)} />
                    <span style={{ marginLeft: "10px" }}>{task.task}</span>
                  </div>
                  <div>
                    <small>{new Date(task.taskDate).toLocaleString()}</small>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StickyNote;
