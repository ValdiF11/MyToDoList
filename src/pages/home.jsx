// Home.js
import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, updateDoc, doc, addDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../components/mainLayout";
import StickyNote from "../components/stickyNote";
import Navbar from "../components/navbar"; // Import Navbar component
import Swal from "sweetalert2";

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [weather, setWeather] = useState(null);
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchUser(user.uid);
      fetchTasks(user.uid);
      fetchWeather();
    }
  }, [user]);

  const fetchTasks = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const userTasks = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).filter((task) => task.userId === userId);
      setTasks(userTasks);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching tasks data",
      });
    }
  };

  const fetchUser = async (userId) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })).find((user) => user.id === userId);
      setUserData(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching user data",
      });
    }
  };

  const fetchWeather = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=Jakarta&appid=${import.meta.env.VITE_API_WEATHER_KEY}`);
      setWeather(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error fetching weather data",
      });
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const taskDoc = doc(db, "tasks", id);
      await updateDoc(taskDoc, { completed: !completed });
      fetchTasks(user.uid);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Error updating task" });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Logout success",
      });
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error logging out",
      });
    }
  };

  const groupedTasks = daysOfWeek.map((day) => ({
    day,
    tasks: tasks.filter((task) => new Date(task.taskDate).getDay() === daysOfWeek.indexOf(day)),
  }));

  return (
    <div className="container">
      <Navbar userData={userData} weather={weather} handleLogout={handleLogout} />
      <div className="d-flex justify-content-between">
        <h2 className="text-center my-4">My Tasks</h2>
        <div className="text-center my-4">
          <button className="btn btn-primary mx-2" onClick={() => navigate("/task-input")}>
            Add Task
          </button>
        </div>
      </div>
      <div className="row">
        {groupedTasks.map((group) => (
          <StickyNote key={group.day} day={group.day} tasks={group.tasks} toggleComplete={toggleComplete} />
        ))}
      </div>
    </div>
  );
};

export default Home;
