import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
export default function CourseSubject(props) {
  const { subject } = useParams();
  const [courseinSubject, setCourse] = useState([]);
  const [state, setState] = useState('');
  const getSourceSubject = async () => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/course/${subject}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    if (resp.ok) {
      const data = await resp.json();
      console.log(data.data);
      setCourse(data.data);
      props.setCourse(data.data)

      console.log(data.data, 'course from coursesubject')
    } else alert("cant fetch");
  };


  const deleteCourse = async id => {
    const resp = await fetch(`${process.env.REACT_APP_URL_DATABASE}/course/${id}/delete`,{
        method: 'DELETE',
        headers:{
            Authorization: `Token ${localStorage.getItem('token')}`,
        }
    });
    if(resp.ok){
        const data = await resp.json()
        setState(data.message)
        getSourceSubject()
    }
  };
  useEffect(() => {
    getSourceSubject();
  }, []);
  const courseRender = courseinSubject.map(course => {
    console.log('Loi', props.currentUser)
    console.log('Course ID',course.teacher_id)
    console.log('Is it true?', props.currentUser === course.teacher_id)
    return (
      <Card className="mt-2">
        <Card.Img variant="top" src={course.img} />
        <Card.Body>
          <Card.Title>{course.name}</Card.Title>
          <Card.Text>{course.desc}</Card.Text>
          <Link to={`/recouse/${course.id}`} className="btn btn-primary">Watch ReCourse</Link>
            {(props.currentUser && props.currentUser.id) === course.teacher_id ?
                    <>
                    <Button onClick={()=> deleteCourse(course.id)} className="m-3">Delete</Button>
                    <Link to={`/course/${course.id}/edit`} className="btn btn-primary m-3">Edit</Link> 
                    </>: ''  
            }
        </Card.Body>
      </Card>
    );
  });
  return <div className="container mt-5">
      {state}
      {courseRender}
      </div>;
}
// {avata_url: "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/67…a&oh=257f397526577e2995bd3f9132b1a2ee&oe=5E8199F6", desc: "a", email: "melodycenter19@gmail.com", name: "Nguyễn Vũ", phone: 912853677}
// avata_url: "https://scontent.fsgn8-1.fna.fbcdn.net/v/t1.0-9/67807878_2325970770850640_5043512832209977344_n.jpg?_nc_cat=110&_nc_ohc=c8FQqSHpJUAAQltdFO5MrPf2mCLhMyM8HGENLoqyJYtSoLU9V_eA9xZDA&_nc_ht=scontent.fsgn8-1.fna&oh=257f397526577e2995bd3f9132b1a2ee&oe=5E8199F6"
// desc: "a"
// email: "melodycenter19@gmail.com"
// name: "Nguyễn Vũ"
// phone: 912853677}