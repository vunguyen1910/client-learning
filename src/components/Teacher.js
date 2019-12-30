import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

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
      <Link
      to={`/course/teacher/${teacher.id}`}
        className="col-md-6 text-center btn"
        data-toggle="tooltip"
        rel="tooltip"
        data-placement="top"
        data-html="true"
        title={`<p><span>Name: </span><strong>${teacher.name}</strong></p><p>${teacher.desc}</p><p><span>Score: </span>${teacher.score}</p>`}>
        <img src={teacher.avata_url} style={{width: "30%"}}/>
        <h4 className="mt-3">{teacher.name}</h4>
      </Link>
    );
  });
  console.log(teachers);
  return (
    <section className="mt-5 bg-light">
      <div className="container mb-5">
        <div className="text-center">
          <h1>Our Teacher</h1>
          <p>This is top 10 Teacher of Learning Music Online </p>
        </div>
        <div className="row">{renderTeacher}</div>
      </div>
    </section>
  );
}
