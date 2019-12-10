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
        const resp = await fetch("https://127.0.0.1:5000/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input)
        })
        
        if(resp.ok){
            const data = await resp.json()
            console.log(data)
            if(data.success === true) setState(data.right)
            if(data.success === false) setState(data.wrong)
        }
    };
    const handelSubmit = (e) => {
        e.preventDefault()
        forgot()
    }
    return (
        <Form className="container" onSubmit={e=>handelSubmit(e)} onChange={e=> handelChange(e)}>
          <p>{state}</p>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Button variant="primary" type="submit">
            Submit
          </Button>
          </Form.Group>
        </Form>
    )
}
