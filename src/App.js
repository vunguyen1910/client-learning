import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Private from "./components/Private";
import Forgot from "./pages/Forgot";
import NewPass from "./pages/NewPass";
import CreateCourse from "./pages/CreateCourse";
import CourseSubject from "./pages/CourseSubject";
import EditCourse from "./pages/EditCourse";
import LearningCourse from "./pages/LearningCourse";
import EditReCourse from "./pages/EditReCourse";
import VideoLearning from "./pages/VideoLearning";
import ClipLoader from "react-spinners";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [course, setCourse] = useState([]);
  const [recourse, setrecourse] = useState([]);

  useEffect(() => {
    getUser();
    window.history.replaceState({}, document.title, window.location.pathname);
  }, []);
  const getUser = async () => {
    const local = localStorage.getItem("token");
    const accessToken =
      window.location.search.split("=")[0] === "?api_key"
        ? window.location.search.split("=")[1]
        : null;
    const token = local || accessToken;
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/getuser`, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      localStorage.setItem("token", token);
      setCurrentUser(data);
    } else {
      localStorage.clear("token");
      setCurrentUser(null);
      setLoaded(true);
    }

  };

  if (!loaded) return <img src="https://i.gifer.com/EXfb.gif" style={{width:"100vw", height:"100vh"}}/>
  return (
    <div className="App Desktop_Version">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route
          path="/login"
          render={() => (
            <Login setCurrentUser={setCurrentUser} currentUser={currentUser} />
          )}
        />
        <Route
          path="/register"
          render={() => (
            <Register
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
            />
          )}
        />
        <Route path="/forgot-password" render={() => <Forgot />} />
        <Route path="/new-password" render={() => <NewPass />} />
        <Private
          path="/create-course"
          user={currentUser}
          component={CreateCourse}
        />
        } />
        <Route
          path="/course/:id/edit"
          render={() => (
            <EditCourse currentUser={currentUser} course={course} />
          )}
        />
        <Route
          path="/course/:subject"
          render={() => (
            <CourseSubject currentUser={currentUser} setCourse={setCourse} />
          )}
        />
        <Route
          path="/recourse/:id/edit"
          render={() => <EditReCourse recourse={recourse} />}
        />
        <Route
          exact
          path="/video/:id"
          render={() => (
            <VideoLearning recourse={recourse} currentUser={currentUser} />
          )}
        />
        <Route
          path="/recouse/:id"
          render={() => (
            <LearningCourse
              currentUser={currentUser}
              setrecourse={setrecourse}
            />
          )}
        />
        <Route path="/" render={() => <HomePage />} />
      </Switch>
    </div>
  );
}

export default App;
