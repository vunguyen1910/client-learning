import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Col, Row, Button, Modal, Form, Tabs, Tab } from "react-bootstrap";
import Markdown from "react-markdown";
import Helmet from "react-helmet";

export default function VideoLearning(props) {
  const [recourse, setReCourse] = useState({});
  const [cutVideo, setCutVideo] = useState("");
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [bodyDoc, setBodyDoc] = useState("");
  const [titleDoc, setTitleDoc] = useState("");
  const [modalDoc, setModalDoc] = useState(false);
  const [docs, setDoc] = useState([]);
  const { id } = useParams();
  const [validated, setValidated] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [editModalOpen, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editID, setEditID] = useState();

  const closeModalDoc = () => setModalDoc(false);
  const closeEditModal = () => setEditModal(false);

  useEffect(() => {
    getReCourse();
    getDoc();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      setValidated(true);
      upload_document();
    }
  };

  const submitEdit = e => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      e.preventDefault();
      setValidated(true);
      editDoc(editID);
    }
  };

  //handle recourse
  const getReCourse = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/singel-recourse/${id}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      const a = data.data.url.split("=")[1];
      setCutVideo(a);
      setReCourse(data.data);
    } else alert("cant fetch");
  };

  //handle doc
  const getDoc = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/render_document`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setDoc(data.data);
    }
  };
  const renderDoc = docs.map(doc => {
    return (
      <>
        <div
          onClick={() => {
            setModalDoc(true);
            setBodyDoc(doc.body);
            setTitleDoc(doc.title);
          }}
        >
          <p
            style={{
              borderStyle: "inset",
              margin: "20px",
              cursor: "pointer",
              wordWrap: "break-word"
            }}
          >
            {doc.title}
          </p>
        </div>
        {(props.currentUser && props.currentUser.id) == doc.teacher_id ? (
          <>
            <Button
              onClick={() => {
                delete_doc(doc.id);
              }}
              className="mr-5"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setEditModal(true);
                setEditTitle(doc.title);
                setEditBody(doc.body);
                setEditID(doc.id);
              }}
            >
              Edit
            </Button>
          </>
        ) : (
          ""
        )}
      </>
    );
  });

  const upload_document = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/create-document`,
      {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: title,
          body: body,
          recourse_id: id
        })
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      if (data.success) {
        setIsOpen(false);
        getDoc();
      }
    }
  };

  const delete_doc = async id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/delete-doc`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    );
    if (resp.ok) getDoc();
  };

  const editDoc = async id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/edit-doc`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editTitle,
          body: editBody
        })
      }
    );
    if (resp.ok) {
      getDoc();
      setEditModal(false);
    }
  };
  console.log(props.currentUser);
  return (
    <div className="container mt-5">
      <Helmet>
        <title>Watch video and read documentation</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6">
          <iframe
              style={{
                width: "100%",
                height: "100%"
              }}
              src={`https://www.youtube.com/embed/${cutVideo}`}
              frameBorder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen="allowfullscreen"
              mozallowfullscreen="mozallowfullscreen" 
              msallowfullscreen="msallowfullscreen" 
              oallowfullscreen="oallowfullscreen" 
              webkitallowfullscreen="webkitallowfullscreen"
            />
              <h1>{recourse && recourse.title}</h1>
        </div>
        <div className="col-md-6">
          something
        </div>
      </div>
      <Modal
        style={{
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        }}
        size="lg"
        show={modalIsOpen}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload your document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={event => handleSubmit(event)}
          >
            <Form.Group as={Col} md="100" controlId="validationCustom01">
              <Form.Label>Title of your Document</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                name="title"
                onChange={e => setTitle(e.target.value)}
              />
              <p style={{ margin: "5px" }}>
                Your document need to be write by <strong>Markdown</strong>{" "}
                <a
                  href="https://www.markdownguide.org/getting-started"
                  target="_blank"
                >
                  See it here
                </a>
              </p>
            </Form.Group>
            <Tabs defaultActiveKey="text" id="uncontrolled-tab-example">
              <Tab eventKey="text" title="Text">
                <Form.Group as={Col} md="100" controlId="validationCustom02">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    type="text"
                    placeholder="Title"
                    name="body"
                    size="lg"
                    rows="10"
                    onChange={e => setBody(e.target.value)}
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="preview" title="preview">
                <Markdown source={body} />
              </Tab>
            </Tabs>
            <Button variant="primary" type="submit">
              Upload
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        style={{
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        }}
        size="lg"
        show={modalDoc}
        onHide={closeModalDoc}
      >
        <Modal.Header closeButton>
          <Modal.Title>{titleDoc}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Markdown source={bodyDoc} />
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        style={{
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)"
        }}
        size="lg"
        show={editModalOpen}
        onHide={closeEditModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit your document</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => submitEdit(e)} noValidate validated={validated}>
            <Form.Group as={Col} md="100">
              <Form.Label>Title of your Document</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Title"
                name="title"
                defaultValue={editTitle}
                onChange={e => {
                  setEditTitle(e.target.value);
                }}
                controlId="validationCustom01"
              />
              <p style={{ margin: "5px" }}>
                Your document need to be write by <strong>Markdown</strong>{" "}
                <a
                  href="https://www.markdownguide.org/getting-started"
                  target="_blank"
                >
                  See it here
                </a>
              </p>
            </Form.Group>
            <Tabs defaultActiveKey="text" id="uncontrolled-tab-example">
              <Tab eventKey="text" title="Text">
                <Form.Group as={Col} md="100">
                  <Form.Label>Body</Form.Label>
                  <Form.Control
                    required
                    as="textarea"
                    type="text"
                    placeholder="Title"
                    name="body"
                    size="lg"
                    rows="10"
                    defaultValue={editBody}
                    onChange={e => {
                      setEditBody(e.target.value);
                    }}
                    controlId="validationCustom02"
                  />
                </Form.Group>
              </Tab>
              <Tab eventKey="preview" title="preview">
                <Markdown source={body} />
              </Tab>
            </Tabs>
            <Button variant="primary" type="submit">
              Edit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
