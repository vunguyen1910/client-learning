import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom'
export default function Forgot() {
    const accessToken =
    window.location.search.split("=")[0] === "?token"
      ? window.location.search.split("=")[1]
      : null;
  const [input, setInput] = useState("");

    const [token, setToken] = useState(accessToken)
    const history = useHistory()

  const getNewPass = async() => {
    if(input){
        const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/new-password`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({"password" : input,
                                  "token": token
                                  })
          });
    if (resp.ok){
        const data = await resp.json()
        history.push('/login')
    }
    }  
  }
console.log(token)
  const handelChange = e => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handelSubmit = e => {
    e.preventDefault();
    getNewPass()
  };

  if (token == null) history.push('/')
  return (
    <Form
      className="container"
      onSubmit={e => handelSubmit(e)}
      onChange={e => handelChange(e)}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name="password" />
        <Form.Text className="text-muted">Input your new Password</Form.Text>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form.Group>
    </Form>
  );
}
