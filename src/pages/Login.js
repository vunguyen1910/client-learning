import React, { useState, useEffect} from "react";
import { Form, Button } from "react-bootstrap";
import {Redirect, useHistory} from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function Login(props) {
  const [input, setInput] = useState({});
  const history = useHistory()

  const handelOnChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input)
    });
    if (resp.ok){
      // co 2 truong hop cua resp 1)resp backend tra ve, 2) error, backend ko tra ve, do HTTP tu tra ve
      const data = await resp.json() // data la` cua backend tra ve
      if (data.success){
        props.setCurrentUser(data.user)
        localStorage.setItem('token', data.token)
        history.goBack()
      }else {
        alert(data.message)
      }
    } else {
      alert('fail to fetch')
    }
  };

  const handleSubmit = e => {
    e.preventDefault()
    login()
  }
  if (props.currentUser) history.goBack()
  return (
    <div>
      <div
        className="text-center container w-50"
        style={{ marginTop: "100px" }}
      >
        <Form
          onChange={e => {
            handelOnChange(e);
          }}
          onSubmit={e => handleSubmit(e)}
        >
          <img
            className="mb-4"
            src={require("../img/login.png")}
            alt=""
            width="72"
            height="72"
          />
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="pass" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <a href={`${process.env.REACT_APP_URL_DATABASE}/loginfacebook/facebook`} rel="noopener noreferrer" className="btn btn-primary ml-3">Login to facebook</a>
          <Link to="/forgot-password" rel="noopener noreferrer" className="btn">Forgot password</Link>
        </Form>
      </div>
    </div>
  );
}
