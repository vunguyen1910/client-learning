import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

export default function MasterHead() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-target="#carouselExampleCaptions"
            data-slide-to="0"
            className="active"
          ></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
          <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={require('../img/photo-1530800226802-6dc8fe3b9900.jpg')} className="d-block card-img img-fluid" alt="drummer"></img>
            <div className="carousel-caption card-img-overlay align-self-center caption-masterhead">
              <h2>Any succesful career starts with good education</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../img/photo-1513829596324-4bb2800c5efb.jpg')} className="d-block w-100 card-img img-fluid" alt="girl" ></img>
            <div className="carousel-caption card-img-overlay align-self-center caption-masterhead">
              <h2>Study music online at home</h2>
            </div>
          </div>
          <div className="carousel-item">
            <img src={require('../img/photo-1511379938547-c1f69419868d.jpg')} className="d-block w-100 card-img img-fluid" alt="instruments" ></img>
            <div className="carousel-caption card-img-overlay align-self-center caption-masterhead">
              <h2>Start from today</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
