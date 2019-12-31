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

  const [comment, setcomment] = useState("");
  const [cmtRender, setCmtRender] = useState([]);
  const [editcomment, setEditComment] = useState("");

  const [recomment, setrecomment] = useState("");
  const closeModalDoc = () => setModalDoc(false);
  const closeEditModal = () => setEditModal(false);

  useEffect(() => {
    getReCourse();
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
      setDoc(data.data.document);
      setCmtRender(data.data.comments);
    } else alert("cant fetch");
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
          key={doc.id}
        >
          <p
            style={{
              margin: "20px",
              cursor: "pointer",
              wordWrap: "break-word"
            }}
            className="border border-info rounded-pill p-2"
          >
            {doc.title}
          </p>
        </div>
        {(props.currentUser && props.currentUser.id) === doc.teacher_id ? (
          <>
            <Button
              onClick={() => {
                delete_doc(doc.id);
              }}
              className="mr-5 btn-dark ml-5"
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
          Authorization: `Token ${localStorage.getItem("token")}`,
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
        getReCourse();
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
    if (resp.ok) getReCourse();
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
      getReCourse();
      setEditModal(false);
    }
  };
  const post_comment = async e => {
    e.preventDefault();
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id}/create-comment`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comment: comment
        })
      }
    );
    if (resp.ok) {
      setcomment("");
      getReCourse();
    }
  };
  const delete_comment = async id_cmt => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${id_cmt}/delete-comment`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    );
    if (resp.ok) getReCourse();
  };
  const editComment = async (e, cmt_id) => {
    e.preventDefault();
    console.log(e.target.value, "comment")
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${cmt_id}/edit-comment`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comment: editcomment
        })
      }
    );
    if (resp.ok) getReCourse();
  };
  console.log(recomment, "recomment");

  const post_recomment = async (e, cmt_id) => {
    e.preventDefault();
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${cmt_id}/create-recomment`,
      {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          recomment: recomment
        })
      }
    );
    if (resp.ok) {
      getReCourse();
    }
  };

  const delete_recomment = async rcmt_id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/recourse/${rcmt_id}/delete-recomment`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`
        }
      }
    );
    if (resp.ok) getReCourse();
  };

  const render_comment = cmtRender.map(cmt => {
    return (
      <>
        <div className="comment bg-light" key={cmt.id}>
          <div className="d-flex">
            <div className="author-comment text-info d-inline-flex">
              <div>
                <img
                  src={cmt.author.avata_url}
                  className="md-avatar rounded-circle"
                />
              </div>
              <div
                className="ml-3 align-self-center"
                style={{ wordWrap: "break-word" }}
              >
                {cmt.author.name}
                <span className="body-comment text-body">{cmt.body}</span>
              </div>
            </div>
            <div className="dropdown mt-4">
              <button
                className="btn dropdown-toggle"
                id={`dropdownMenuButton${cmt.id}`}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></button>
              <div
                className="dropdown-menu"
                aria-labelledby={`dropdownMenuButton${cmt.id}`}
              >
                <div
                  className="btn text-primary"
                  data-toggle="collapse"
                  href={`#collapseExample${cmt.id}`}
                  role="button"
                  aria-expanded="false"
                  aria-controls={`collapseExample${cmt.id}`}
                >
                  <i className="far fa-edit"></i> Edit
                </div>
                <div className="btn" onClick={() => delete_comment(cmt.id)}>
                  Delete
                </div>
              </div>
            </div>
          </div>
          <div className="collapse" id={`collapseExample${cmt.id}`}>
            <form>
              <input
                className="form-control"
                onChange={e => setEditComment(e.target.value)}
                defaultValue={cmt.body}
              />
              <button
                className="btn text-primary"
                data-toggle="collapse"
                aria-controls={`collapseExample${cmt.id}`}
                href={`#collapseExample${cmt.id}`}
                type="submit"
                onClick={e => editComment(e, cmt.id)}
              >
                Change
              </button>
            </form>
          </div>
          <div className="ml-5">
            {cmt.recomment &&
              cmt.recomment.map(recmt => {
                return (
                  <>
                    <div className="d-flex" key={recmt.id}>
                      <div className="author-comment text-info d-inline-flex">
                        <div>
                          <img
                            src={recmt.author.avata_url}
                            className="md-avatar rounded-circle"
                          />
                        </div>
                        <div className="ml-3 align-self-center">
                          {recmt.author.name}{" "}
                          <span className="body-comment text-body">
                            {recmt.body}
                          </span>
                        </div>
                      </div>
                      {props.currentUser &&
                        (props.currentUser.id === recmt.author.id ? (
                          <div className="dropdown">
                            <div
                              className="mt-4 btn dropdown-toggle"
                              id={`dropdownMenuButton${recmt.id}`}
                              data-toggle="dropdown"
                              aria-haspopup="true"
                              aria-expanded="false"
                            ></div>
                            <div
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenuButton${recmt.id}`}
                            >
                              <div
                                className="btn dropdown-item"
                                onClick={() => delete_recomment(recmt.id)}
                              >
                                Delete
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        ))}
                    </div>
                  </>
                );
              })}
          </div>
        </div>
        {props.currentUser &&
          (props.currentUser.role === "teacher" ? (
            <>
              <div
                className="btn rounded-pill p-3 m-2 text-primary"
                data-toggle="collapse"
                href={`#collapseRecomment${cmt.id}`}
                role="button"
                aria-expanded="false"
                aria-controls={`collapseRecomment${cmt.id}`}
              >
                <i className="fas fa-comments"></i> Answer
              </div>
            </>
          ) : (
            ""
          ))}
        {props.currentUser &&
          (props.currentUser.id === cmt.author.id ? (
            <>
              <div className="collapse" id={`collapseRecomment${cmt.id}`}>
                <form
                  className="ml-5"
                  onSubmit={e => post_recomment(e, cmt.id)}
                >
                  <input
                    className="form-control"
                    onChange={e => setrecomment(e.target.value)}
                  />
                  <button
                    className="btn m-2 text-primary"
                    data-toggle="collapse"
                    aria-controls={`collapseRecomment${cmt.id}`}
                    href={`#collapseRecomment${cmt.id}`}
                    type="submit"
                  >
                    Post Recomment
                  </button>
                </form>
              </div>
            </>
          ) : (
            ""
          ))}
          <hr/>
      </>
    );
  });

  console.log(cmtRender, "cmt");

  return (
    <div className="container mt-5">
      <Helmet>
        <title>Watch video and read documentation</title>
      </Helmet>
      <div className="row">
        <div className="col-md-6">
          <div style={{ height: "500px" }}>
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
          </div>
          <h1 className="pt-3 title-video">
            <i className="fas fa-book-open mr-3"></i>
            {recourse && recourse.title}
          </h1>
          <p className="pt-2 desc-video">
            <i className="fas fa-chalkboard mr-3" style={{ color: "#020066" }}></i>
            {recourse && recourse.desc}
          </p>
          <hr className="mt-5" />
        </div>
        <div className="col-md-6">
          {props.currentUser &&
            (props.currentUser.role === "teacher" ? (
              <Button
                onClick={() => openModal()}
                className="rounded-pill input-button px-4"
                style={{ backgroundColor: "#c42677" }}
              >
                Upload document
              </Button>
            ) : (
              ""
            ))}
          <h2>Document here if you want to read</h2>
          {renderDoc}
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <h2 className="title-comment mb-3">Comment</h2>
            {props.currentUser ? (
              <>
                <form>
                  <div className="form-group">
                    <input
                      type="text-aria"
                      className="form-control"
                      placeholder="Ask teacher"
                      className="rounded-pill w-100"
                      style={{ height: "50px" }}
                      onChange={e => setcomment(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn login-button mb-3"
                    onClick={e => post_comment(e)}
                  >
                    Comment
                  </button>
                </form>
              </>
            ) : (
              <></>
            )}
            {render_comment}
          </div>
        </div>
        <div className="col-md-6">{/* spacing */}</div>
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
