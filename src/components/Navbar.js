import React from "react";
import { Link, useHistory } from "react-router-dom";
import { HashLink as LinkTo } from "react-router-hash-link";
export default function NavBar(props) {
  const history = useHistory();

  const logOut = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/logout`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      }
    });
    if (resp.ok) {
      localStorage.clear("token");
      props.setCurrentUser(null);
      history.push("/");
    } else {
      alert("something wrong log out again");
    }
  };
  const editNotice = async id => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/notification/${id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        }
      }
    );
    if (resp.ok) {
      props.getNotification();
    }
  };
  console.log(props.notification," notice")
  const noticeRender = props.notification.map(notice => {
    return (
      <div key={notice.id}>
        {notice.readed === true ? (
          <LinkTo
            className="dropdown-item btn btn-light"
            to={`/video/${notice.post_id}/#cmt${notice.comment_id}`}
            key = {notice.id}
          >
            {notice.body}
          </LinkTo>
        ) : (
          <LinkTo
            className="dropdown-item"
            to={`/video/${notice.post_id}`}
            style={{ backgroundColor: "grey", color: "white" }}
            onClick={() => editNotice(notice.id)}
          >
            {notice.body}
          </LinkTo>
        )}
      </div>
    );
  });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <Link to="/">
          <img
            className="navbar-brand ml-5"
            href="#"
            src={require("../img/group-2.png")}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto"></ul>
          {props.currentUser ? (
            <>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i
                    className="fas fa-globe-asia"
                    style={{ color: props.countNotice === 0 ? "white" : "red" }}
                  >
                    {props.countNotice !== 0 ? ` ${props.countNotice}` : ""}
                  </i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  {noticeRender}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          <ul className="navbar-nav col-auto">
            <li className="nav-item">
              <LinkTo
                className="nav-link border-right active px-5"
                to="/#course"
              >
                <i className="fas fa-graduation-cap"></i> Courses
              </LinkTo>
            </li>
            {props.currentUser ? (
              <>
                <li className="dropleft show nav-item mx-5">
                  <img
                    className="dropdown-toggle md-avatar rounded-circle"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    src={props.currentUser && props.currentUser.avata_url}
                  />

                  <ul
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <li className="nav-item">
                      <div className="dropdown-item" onClick={() => logOut()}>
                      <i className="fas fa-sign-out-alt"></i> Logout
                      </div>
                    </li>
                    {props.currentUser &&
                      (props.currentUser.role === "teacher" ? (
                        <>
                          <li className="nav-item">
                            <Link
                              to="/create-course"
                              className="dropdown-item"
                            >
                              <i className="fas fa-plus"></i> Create Courses
                            </Link>
                          </li>
                        </>
                      ) : (
                        <></>
                      ))}
                  </ul>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link active mx-5" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link btn btn-outline-secondary rounded-pill active px-3"
                    to="/register"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}
