import React from "react";
import { Link } from "react-router-dom";
export default function Courses() {
  return (
    <section className="course px-5 py-5">
      <div className="container">
        <div class="card-deck">
          <div class="card border-0">
            <img
              src={require("../img/course-guitar.png")}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title text-center title-course">Guitar</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><span><u>Teacher:</u></span> Nguyen Vu</li>
                <li class="list-group-item">
                  Learn how to play guitar with the best online guitar lessons
                  available. For both beginner guitar and advanced.
                </li>
              </ul>
              <div className="container d-flex justify-content-center py-4">
                <Link className="btn btn-secondary rounded-pill btn-course">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div class="card border-0">
            <img
              src={require("../img/course-piano.png")}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title text-center title-course ">Piano</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><span><u>Teacher:</u></span> Nguyen Vu</li>
                <li class="list-group-item">
                  Discover online piano lessons to fulfil your musical goal
                  step-by-step and get real time feedback while practicing.
                </li>
              </ul>
              <div className="container d-flex justify-content-center py-4">
                <Link className="btn btn-secondary rounded-pill btn-course">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
          <div class="card  border-0">
            <img
              src={require("../img/course-violin.png")}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title text-center title-course">Violin</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item"><span><u>Teacher:</u></span> Nguyen Vu</li>
                <li class="list-group-item">
                  Watch over tutorial videos by professional classical
                  violinists to help you master the violin and play the music
                  you love beautifully.
                </li>
              </ul>
              <div className="container d-flex justify-content-center py-4">
                <Link className="btn btn-secondary rounded-pill btn-course">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
