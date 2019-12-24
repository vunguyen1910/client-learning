import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { HashLink as LinkTo } from "react-router-hash-link";
export default function NavBar(props) {
  const history = useHistory();

  const logOut = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/logout`, {
      headers: {
        Authorization: localStorage.getItem("token"),
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
          <ul className="navbar-nav col-auto">
            <li className="nav-item">
              <LinkTo className="nav-link border-right active px-5" to="/#course">
                Courses
              </LinkTo>
            </li>
            {props.currentUser ? (
              <>
                <li className="nav-item">
                  <div className="nav-link active mx-5" onClick={()=>logOut()}>Logout</div>
                </li>
                <li className="nav-item">
                  <Link to="/create-course" className="nav-link active mx-5">Create Courses</Link>
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
                    Become A Tutor
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
