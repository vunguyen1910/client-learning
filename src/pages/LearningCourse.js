import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Form, Col } from "react-bootstrap";
import Helmet from "react-helmet";
export default function LearningCourse(props) {
  const [reCourse, setReCourse] = useState([]);
  const [url, seturl] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState("");
  const { id } = useParams();

  useEffect(() => {
    getReCourse();
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
      <Card className="mt-2">
        <Card.Body>
          <Card.Title>{recourse.title}</Card.Title>
          <Card.Text>{recourse.desc}</Card.Text>
          <Link to={`/video/${recourse.id}`} className="btn btn-primary">
            View
          </Link>
          {props.currentUser ? (
            props.currentUser.id === recourse.teacher_id ? (
              <>
                <Button
                  onClick={() => {
                    deleterReCourse(recourse.id);
                  }}
                  className="m-3"
                >
                  Delete
                </Button>
                <Link
                  className="btn btn-primary"
                  to={`/recourse/${recourse.id}/edit`}
                >
                  Edit
                </Link>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
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
          Authorization: localStorage.getItem("token"),
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
    <div className="container">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {(props.currentUser && props.currentUser.teacher_id) ===
      reCourse.teacher_id ? (
        <section className="container create-course my-5">
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="px-4 py-4"
          >
            <Form.Group controlId="validationCustom01">
              <Form.Label className="create-course-label">
                Title of recourse
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
                Video URL from Youtube
              </Form.Label>
              <Form.Control
                required
                type="url"
                className="input-login rounded-pill"
                onChange={(e)=>seturl(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                You must insert your course's image
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationCustom04">
              <Form.Label className="create-course-label">
                Description
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
      ) : (
        ""
      )}
      {state}
      {recourseRender}
    </div>
  );
}
