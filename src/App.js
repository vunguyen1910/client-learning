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

function App(props) {
  const [currentUser, setCurrentUser] = useState(null);
  const [course, setCourse] = useState([]);
  const [recourse, setrecourse] = useState([]);
  const [notification, setNotification] = useState([])
  const [countNotice, setCountNotice] = useState(0);

  useEffect(() => {
    getUser();
    window.history.replaceState({}, document.title, window.location.pathname);
    getNotification()
    // const interval = setInterval(function(){
    //   getNotification()
    //   console.log('get notice')
    // }, 5000)
    // return interval
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
      setCurrentUser(data.user);
    } else {
      localStorage.clear("token");
      setCurrentUser(null);
    }

  };

  const getNotification = async() => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/notification`,{
      headers:{
        Authorization: `Token ${localStorage.getItem("token")}`
      }
    })
    if (resp.ok){
      const data = await resp.json()
      setNotification(data.data)
      setCountNotice(data.countUnseen)
    }
  }

console.log(countNotice)
  return (
    <div className="App">
      <Navbar currentUser={currentUser} setCurrentUser={setCurrentUser} notification={notification} getNotification={getNotification} countNotice={countNotice}/>
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
          {...props}
        />
        } />
        <Route
          path="/course/:id/edit"
          render={() => (
            <EditCourse currentUser={currentUser} course={course} {...props}/>
          )}
        />
        <Route
          path="/course/:subject"
          render={() => (
            <CourseSubject currentUser={currentUser} setCourse={setCourse} {...props} />
          )}
        />
        <Route
          path="/recourse/:id/edit"
          render={() => <EditReCourse recourse={recourse} {...props}/>}
        />
        <Route
          exact
          path="/video/:id"
          render={() => (
            <VideoLearning recourse={recourse} currentUser={currentUser} {...props}/>
          )}
        />
        <Route
          path="/recouse/:id"
          render={() => (
            <LearningCourse
              currentUser={currentUser}
              setrecourse={setrecourse}
              {...props}
            />
          )}
        />
        <Route path="/" render={() => <HomePage {...props}/>} />
      </Switch>
    </div>
  );
}

export default App;
