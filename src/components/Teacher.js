import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonToolbar, OverlayTrigger, Tooltip} from "react-bootstrap";

export default function Teacher() {
  const [teachers, setTeacher] = useState([]);
  useEffect(() => {
    getTeacher();
  }, []);
  const getTeacher = async () => {
    const resp = await fetch(
      `${process.env.REACT_APP_URL_DATABASE}/get-top-10`,
      {
        headers: { "Content-Type": "application/json" }
      }
    );
    if (resp.ok) {
      const data = await resp.json();
      setTeacher(data.user);
    }
  };
  const renderTeacher = teachers.map(teacher => {
    return (
      <ButtonToolbar className="col-md-2 text-center btn" key={teacher.id}>
        <OverlayTrigger
          placement='top'
          overlay={
            <Tooltip id={`tooltip-${teacher.id}`}>
              <div>
                <h5><span>Name: </span>{teacher.name}</h5>
                <p>{teacher.desc}</p>
                <p><span>Score: </span>{teacher.score}</p>
              </div>
            </Tooltip>
          }
        >
          <Link
          className="btn"
            to={`/course/teacher/${teacher.id}`}
            >
            <img src={teacher.avata_url} style={{ width: "100%" }} />
          </Link>
        </OverlayTrigger>
      </ButtonToolbar>
    );
  });
  console.log(teachers);
  return (
    <section className="mt-5">
      <div className="container mb-5">
        <div className="text-center">
          <h1>Our Teacher</h1>
          <p>This is top 10 Teacher of Learning Music Online </p>
        </div>
        <div className="row">
          {renderTeacher}
        </div>
      </div>
    </section>
  );
}
