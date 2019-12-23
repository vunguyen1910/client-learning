import React from "react";
import { Link } from "react-router-dom";
export default function Courses() {
  return (
    <section className="course px-5 py-5">
        <div className="container">
      <div class="card-deck">
 
        <div class="card border-0">
          <img src={require('../img/course-guitar.png')} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title text-center title-course">Guitar</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card border-0">
          <img src={require('../img/course-piano.png')} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title text-center title-course ">Piano</h5>
            <p class="card-text">
              This card has supporting text below as a natural lead-in to
              additional content.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
        <div class="card  border-0">
          <img src={require('../img/course-violin.png')} class="card-img-top" alt="..." />
          <div class="card-body">
            <h5 class="card-title text-center title-course">Violin</h5>
            <p class="card-text">
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </p>
          </div>
          <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
