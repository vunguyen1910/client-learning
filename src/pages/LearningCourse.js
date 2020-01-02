import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Form} from "react-bootstrap";
import Helmet from "react-helmet";
import moment from 'moment'
export default function LearningCourse(props) {
  const [reCourse, setReCourse] = useState([]);
  const [url, seturl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState("");
  const { id } = useParams();
  const [course, setCourse] = useState({})

  useEffect(() => {
    getReCourse();
    get_singele_course()
  }, []);



  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      createReCourse()
    }
  };

  const get_singele_course = async() =>{
    const resp = await fetch( `${process.env.REACT_APP_URL_DATABASE}/course/single-course/${id}`,
    {
      headers:{
        "Content-Type": "application/json"
      }
    })
    if (resp.ok){
      const data = await resp.json()
      setCourse(data.course)
    }
  }
  const getReCourse = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setReCourse(data.data);
      props.setrecourse(reCourse);
    } else alert("cant fetch");
  };

  const recourseRender = reCourse.map(recourse => {
    return (
      <Card className="mt-2 d-flex" key={recourse.id}>
        <Card.Body>
          <Card.Title> <i className="fas fa-book-open"></i> {recourse.title}</Card.Title>
          <Card.Text> <i className="fas fa-align-left"></i> {recourse.desc}</Card.Text>
          <div> <i className="far fa-clock mr-3"></i>{moment(recourse.date).fromNow()}</div>  
          <Link to={`/video/${recourse.id}`} className="btn btn-primary">
          <i className="fab fa-leanpub"></i> View
          </Link>
          {props.currentUser && (props.currentUser.id === recourse.author.id ?
              <>
                <Button
                  onClick={() => {
                    deleterReCourse(recourse.id);
                  }}
                  className="m-3"
                >
                  <i className="fas fa-trash-alt"></i> Delete
                </Button>
                <Link
                  className="btn btn-primary"
                  to={`/recourse/${recourse.id}/edit`}
                >
                  <i class="far fa-edit"></i> Edit
                </Link>
              </>
            : "")}
        </Card.Body>
                   
      </Card>
    );
  });
  const createReCourse = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          url: url,
          desc: desc,
          teacher_id: props.currentUser.id,
          course_id: id
        })
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data.success) {
        setState("You has upload the video URL");
        getReCourse();
      } else setState("Video already exist");
    }
  };
  const deleterReCourse = async id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/delete`,
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
      getReCourse();
    }
  };
  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
    <div className="container">
      <div className="row mt-3 bg-light">
        <div className="col-md-8 pt-5">
          <div>
            <h1>{course.name}</h1>
            <p>{course.desc}</p>
          </div>
          <div className="row ml-3">
            <div className="col-md-2">
              <img src={course.user_id && course.user_id.avata_url} className="md-avatar rounded-circle" style={{width:"70px", height:"auto"}}/>
            </div>
            <div className="col-md-10">
              <p><strong>{course.user_id && course.user_id.name}</strong></p>
              <p>{course.user_id && course.user_id.desc}</p>
            </div>
          </div>
            <div className="mt-4 ml-5">
              <i class="far fa-clock mr-2"></i> {moment(course.date).fromNow()}
            </div>
        </div>
        <div className="col-md-4">
          <img src={course.img} style={{width: "30vw"}}/>
        </div>
      </div>
      {props.currentUser && (props.currentUser.role === "teacher" ? <>
        <section className="container create-course my-5">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="px-4 py-4"
          >
            <Form.Group controlId="validationCustom01">
              <Form.Label className="create-course-label">
              <i className="fas fa-book-reader"></i> Title of recourse
              </Form.Label>
              <Form.Control
                required
                type="text"
                className="input-login rounded-pill"
                onChange={(e)=> setTitle(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                You must insert your course's name
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom02">
              <Form.Label className="create-course-label">
              <i className="fas fa-link"></i> Video URL from Youtube
              </Form.Label>
              <Form.Control
                required
                type="url"
                className="input-login rounded-pill"
                onChange={(e)=>seturl(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                You must insert your course's URL
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04">
              <Form.Label className="create-course-label">
              <i className="fas fa-align-left"></i> Description
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="2"
                maxLength="190"
                placeholder="Only 190 character"
                required
                className="input-login rounded-pill"
                onChange={(e)=> setDesc(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-center">
              <Button type="submit" className="px-5 py-3 login-button">
                Upload course
              </Button>
            </div>
          </Form>
        </section>
      </> : (
        ""
      ))}
      {state}

    </div>
    <div className="jumbotron">
      <div className="container">
    {recourseRender}
    </div>
    </div>
    </>
  );
}
