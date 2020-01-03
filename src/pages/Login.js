import React, { useState } from "react";
import {useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [input, setInput] = useState({});
  const history = useHistory();

  const handelOnChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/login`, {
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
        props.setCurrentUser(data.user);
        localStorage.setItem("token", data.token);
        history.goBack();
      } else {
        alert(data.message);
      }
    } else {
      alert("fail to fetch");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    login();
  };
  if (props.currentUser) history.push('/');
  return (
    <section className="jumbotron bg-transparent">
      <div className="row">
        <div className="col-lg-6 d-none d-md-block text-center">
          <img src={require("../img/login-img.png")} />
        </div>
        <div className="col-lg-6 pr-5">
          <h1 className="title-signin text-center">Sign in</h1>
          <form className="container needs-validation" novalidate onChange={(e)=>handelOnChange(e)}>
            <div className="form-group">
              <label className="login-label">Email address</label>
              <input
                type="email"
                className="form-control rounded-pill input-login text-center" id="validationCustom01"
                required
                name="email"
              />
            </div>
            <div className="form-group">
              <label className="login-label">Password</label>
              <input
                type="password"
                className="form-control rounded-pill input-login text-center" id="validationCustom02"
                required
                name="pass"
              />
            </div>
            <div className="d-flex justify-content-end">
              <Link className="d-inline-flex forgot-password" rel="noopener noreferrer" to="/forgot-password">Forgot password</Link><br/>
            </div>
            <button type="submit" className="btn login-button p-3 px-5" onClick={(e)=> handleSubmit(e)}>
              Login
            </button>
            <a href={`${process.env.REACT_APP_URL_DATABASE}/loginfacebook/facebook`} className="btn btn-primary mx-5 login-facebook p-3 px-5">Login facebook</a>
          </form>
          
        </div>
      </div>
    </section>
  );
}
