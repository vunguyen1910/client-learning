import React from "react";

export default function AboutUs() {
  return (
    <section className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container">
        <div className="row">
          <div className="col-6">
            <img
              src={require("../img/bitmap.png")}
              alt="artist"
              className="img-fluid"
            />
          </div>
          <div className="col-6">
            <div className="container">
              <h2>About Us</h2>
              <p className="lead mt-5">
                Music associated with our life. It's hard to imagine a world
                that lacks the notes: from mother lull you to sleep,
                instrumental for coffee Saturday afternoon, song honoring her
                pupil for graduation, to the tune thrill for wedding couple.
                Even when he is sad, painful, we also seek to melodies soothe
                the spirit.
              </p>
            </div>
            <div className="container px-5 py-5 aboutus">
              <div className="row">
                <div className="col-2 col-md-2 d-none d-md-block">
                  <p>
                    <i className="fas fa-book-open fa-2x pb-4"></i>
                  </p>
                  <p>
                    <i className="fas fa-chalkboard-teacher fa-2x pb-4"></i>
                  </p>
                  <p>
                    <i className="far fa-comment-alt fa-2x"></i>
                  </p>
                </div>
                <div className="col-10 col-md-10">
                  <h5 className="mb-5 text-aboutus">Learn anything</h5>
                  <h5 className="mb-5 ml-0 text-aboutus">Talk to instructors</h5>
                  <h5 className="text-aboutus">Speak with others</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
