import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Helmet from "react-helmet";
import moment from "moment";
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
          <img
            src={course.img}
            class="card-img-top"
            alt="..."
            style={{ height: "50vh" }}
          />
          <div className="card-body">
            <h5
              className="card-title title-card-course"
              style={{ height: "5vh" }}
            >
              <i class="fas fa-music mr-3"></i>
              {course.name}
            </h5>

            <div className="my-4 d-flex"> 
              <img className="md-avatar rounded-circle mr-3" src={course.user_id && course.user_id.avata_url} alt="author avata" />
              <div>
                <p className="text-card-course">Author: {course.user_id && course.user_id.name}</p>
                <div className="text-card-course">
                  <i className="fas fa-clock mr-2"></i>
                  {moment(course.date).fromNow()}
                 </div>
              </div>
            </div>
            
            <p
              className="card-text text-card-course"
              style={{ height: "15vh" }}
            >
              <i class="fas fa-hand-holding-heart mr-3"></i>
              {course.desc}
            </p>
            <Link
              to={`/recouse/${course.id}`}
              className="btn login-button px-5"
            >
              <i class="fas fa-play-circle mr-2"></i> Watch course
            </Link>
            {props.currentUser &&
              (props.currentUser.id === course.user_id.id ? (
                <>
                  <Link
                    to={`/course/${course.id}/edit`}
                    className="btn login-button mx-2 px-4 rounded-pill"
                  >
                    {" "}
                    <i class="far fa-edit"></i>
                  </Link>
                  <div
                    className="btn login-button rounded-pill px-4"
                    onClick={() => deleteCourse(course.id)}
                  >
                    {" "}
                    <i className="fas fa-trash-alt"></i>
                  </div>
                </>
              ) : (
                ""
              ))}
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="container my-5">
      <Helmet>
        <title>{subject}</title>
      </Helmet>
      {state}
      <div className="row">{courseRender}</div>
    </div>
  );
}
