import React, { useState} from "react";
import { Form, Button } from "react-bootstrap";
import {useHistory} from 'react-router-dom'
export default function Forgot() {
    const accessToken =
    window.location.search.split("=")[0] === "?token"
      ? window.location.search.split("=")[1]
      : null;
  const [input, setInput] = useState("");

    const token = accessToken
    const history = useHistory()
console.log(input.value)
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
        history.push('/login')
    }
    }  
  }
console.log(token)
  const handelSubmit = e => {
    e.preventDefault();
    getNewPass()
  };
console.log(input)
  if (token == null) history.push('/')
  return (
    <div className="container form-forgot text-center">
    <Form
      onSubmit={e => handelSubmit(e)}
      onChange={e => setInput(e.target.value)}
    >
      <Form.Group controlId="formBasicEmail">
        <Form.Label>New Password</Form.Label>
        <Form.Control type="password" placeholder="Enter password" name="password" />
        <Form.Text className="text-muted">Input your new Password</Form.Text>
        <Button variant="primary" type="submit" className="login-button mt-5">
          Submit
        </Button>
      </Form.Group>
    </Form>
    </div>
  );
}
