import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
export default function EditCourse(props) {
  const { id } = useParams();
  const courses = props.course;
  const getCourseByID = courses.filter( course => {
    if (course.id == id) return true;
  })[0];


  const [name, setName] = useState(getCourseByID && getCourseByID.name);
  const [img, setImg] = useState(getCourseByID && getCourseByID.img);
  const [desc, setDesc] = useState(getCourseByID && getCourseByID.desc);
  const [validated, setValidated] = useState(false);

  const history = useHistory();
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
    }
  };

  const editCourse = async () => {
      const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/course/${id}/edit`,{
        method: 'PUT',
        headers:{
            Authorization: localStorage.getItem('token'),
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
              'name': name,
              'img' : img,
              'desc': desc
          })
      })
      if(resp.ok){
          history.goBack()
          const data = await resp.json()
      }
  };
  return (
    <div className="container">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Name of your course</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Please input your course's name"
            onChange={e => setName(e.target.value)}
            defaultValue = {name}
          />
          <Form.Control.Feedback type="invalid">
            You must insert your course's name
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Image of your course</Form.Label>
          <Form.Control
            required
            type="url"
            placeholder="Please input your course's image"
            onChange={e => setImg(e.target.value)}
            defaultValue = {img}
          />
          <Form.Control.Feedback type="invalid">
            You must insert your course's image
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Description of your course here</Form.Label>
          <Form.Control
            as="textarea"
            rows="2"
            maxLength="190"
            placeholder="Only 190 character"
            onChange={e => setDesc(e.target.value)}
            required
            defaultValue = {desc}
          />
        </Form.Group>

        <Button type="submit" onClick={()=> editCourse()}>Upload course</Button>
      </Form>
    </div>
  );
}
