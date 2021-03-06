import React, {useState} from 'react'
import {Form, Button} from 'react-bootstrap'
export default function Forgot() {
    const [input, setInput] = useState("");
    const [state, setState] = useState('')
    const handelChange=(e)=>{
        e.preventDefault()
        setInput({ ...input, [e.target.name]: e.target.value })
    }
    const forgot = async () => {
        const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input)
        })
        
        if(resp.ok){
            const data = await resp.json()
            if(data.success === true) setState(data.right)
            if(data.success === false) setState(data.wrong)
        }
    };
    const handelSubmit = (e) => {
        e.preventDefault()
        forgot()
    }
    return (
      <div className="container form-forgot text-center ">
        <Form onSubmit={e=>handelSubmit(e)} onChange={e=> handelChange(e)}>
          <h3 style={{color: "green"}}>{state}</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
            <Button variant="primary" type="submit" className="login-button mt-5">
            Submit
          </Button>
          </Form.Group>
        </Form>
        </div>
    )
}
