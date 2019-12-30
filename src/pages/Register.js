import React, { useState } from "react";
import { useHistory} from "react-router-dom";

export default function Register(props) {
  const [input, setInput] = useState({});

  const history = useHistory();

  const handelOnChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = event => {
    event.preventDefault();
    postUser();
  };
  const postUser = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });
    if (resp.ok) {
      // co 2 truong hop cua resp 1)resp backend tra ve, 2) error, backend ko tra ve, do HTTP tu tra ve
      const data = await resp.json(); // data la` cua backend tra ve
      if (data.success) {
        history.push("/login");
      }
    }
  };
  console.log(input, "input here")
  if (props.currentUser) history.push("/");
  return (
    <section className="jumbotron bg-transparent">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block text-center">
          <img src={require("../img/login-img.png")} />
        </div>
        <div className="col-lg-6 pr-5">
          <h1 className="title-signin text-center">Sign up</h1>
          <form
            className="container needs-validation"
            novalidate
            onChange={e => handelOnChange(e)}
          >
            <div className="form-group">
              <label className="login-label">Email address</label>
              <input
                type="email"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom01"
                required
                name="email"
              />
            </div>
            <div className="row">
            <div className="form-group col-md-6">
              <label className="login-label">Full Name</label>
              <input
                type="text"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom02"
                required
                name="name"
              />
            </div>
            <div className="form-group col-md-6">
              <label className="login-label">Phone</label>
              <input
                type="phone"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom02"
                required
                name="phone"
              />
            </div>
            </div>
            <div className="row">
            <div className="col-md-6">
            <label className="login-label">Role</label>
            <select class="form-control rounded-pill input-login text-center mb-3" name="role">
              <option>None</option>          
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            </div>
            <div className="form-group col-md-6">
              <label className="login-label">Avata URL</label>
              <input
                type="url"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom02"
                required
                name="avata_url"
              />
            </div>

            </div>
            <div className="form-group">
              <label className="login-label">Description</label>
              <input
                type="text"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom02"
                required
                name="desc"
              />
            </div>
            
            <div className="form-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill input-login text-center"
                id="validationCustom03"
                required
                name="password"
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn login-button p-3 px-5 justify-content-center"
                onClick={e => handleSubmit(e)}
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
