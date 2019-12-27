import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Helmet from "react-helmet";
export default function CourseSubject(props) {
  const { subject } = useParams();
  const [courseinSubject, setCourse] = useState([]);
  const [state, setState] = useState("");
  useEffect(() => {
    getSourceSubject();
  }, []);
  const getSourceSubject = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/course/${subject}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setCourse(data.data);
      props.setCourse(data.data);
    } else alert("cant fetch");
  };

  const deleteCourse = async id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/course/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setState(data.message);
      getSourceSubject();
    }
  };
  const courseRender = courseinSubject.map(course => {
    return (
      <div className="col-md-6 mt-5">
        <div className="card card-course">
          <img src={course.img} class="card-img-top" alt="..." style={{height:"50vh"}}/>
          <div className="card-body">
            <h5 className="card-title title-card-course" style={{height:"5vh"}}>{course.name}</h5>
            <p className="card-text text-card-course" style={{height:"15vh"}}>{course.desc}</p>
            <Link to={`/recouse/${course.id}`} className="btn login-button px-5">Watch course</Link>
            {props. currentUser && (props.currentUser.id == course.user_id ? <><Link to={`/course/${course.id}/edit`} className="btn btn-primary mx-2 px-4 rounded-pill">Edit</Link>
            <div className="btn btn-dark rounded-pill px-4" onClick={()=>deleteCourse(course.id)}>Delete</div></> : "")}

          </div>
        </div>
      </div>
    );
  });
  console.log(courseinSubject,"course in subject")
  return (
    <div className="container my-5">
      <Helmet>
        <title>{subject}</title>
      </Helmet>
      {state}
      <div className="row">
        {courseRender}
      </div>
    </div>
  );
}
