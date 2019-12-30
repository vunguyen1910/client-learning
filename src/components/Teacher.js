import React, { useState, useEffect } from "react";

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
      console.log('ejeje', teacher)
    return (
    <div className="carousel-item active">
        <img src={teacher.avata_url}/>

    </div>);
  });
  console.log(teachers)
  return (
    <section className="mt-5 bg-light">
      <div className="container mb-5">
        <div className="text-center">
          <h1>Our Teacher</h1>
          <p>This is top 10 Teacher of Learning Music Online </p>
        </div>
        <div id="multi-item-example" className="carousel slide carousel-multi-item" data-ride="carousel">
            <div className="carousel-inner" role="listbox">
                
            </div>
        
        <div className="controls-top">
            <a className="btn-floating" href="#multi-item-example" data-slide="prev"><i className="fa fa-chevron-left"></i></a>
            <a className="btn-floating" href="#multi-item-example" data-slide="next"><i className="fa fa-chevron-right"></i></a>
        </div>
        </div>
        
      </div>
    </section>
  );
}
