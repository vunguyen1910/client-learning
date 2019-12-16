import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
export default function EditReCourse(props) {
  const { id } = useParams();

  const recourse = props.recourse;
  const getRecourseByID = recourse.filter(recourseID => {
    if (recourseID.id == id) return true;
  })[0];

  const [title, setTitle] = useState(getRecourseByID && getRecourseByID.title);
  const [url, setURL] = useState(getRecourseByID && getRecourseByID.url);
  const [desc, setdesc] = useState(getRecourseByID && getRecourseByID.desc);
  const [validated, setValidated] = useState(false);
  const [state, setState] = useState("");

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
const history = useHistory()
  const editrecourse = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/edit`, {
      method: "PUT",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "title": title,
        "url": url,
        "desc": desc
      })
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data.success) {setState("You has edit it")}
      else setState("something went wrong");
      history.goBack()
    }
  };
  return (
    <div>
      <p style={{ color: "red" }}>{state}</p>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="validationCustom01">
          <Form.Label>Change your Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Please input your title"
            onChange={e => setTitle(e.target.value)}
            defaultValue={title}
          />
        </Form.Group>
        <Form.Group controlId="validationCustom02">
          <Form.Label>Change your URL recourse</Form.Label>
          <Form.Control
            required
            type="url"
            placeholder="Please input your URL"
            onChange={e => setURL(e.target.value)}
            defaultValue={url}
          />
        </Form.Group>
        <Form.Group controlId="validationCustom03">
          <Form.Label>Change your Description recourse</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Please input your course's name"
            onChange={e => setdesc(e.target.value)}
            defaultValue={desc}
          />
        </Form.Group>
        <Button type="submit" onClick={() => editrecourse()}>
          Upload course
        </Button>
      </Form>
    </div>
  );
}
