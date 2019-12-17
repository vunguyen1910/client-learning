import React from "react";
import { Link } from "react-router-dom";
import { CardDeck, Card, Button } from "react-bootstrap";
export default function Courses() {
  return (
    <div id="course">
      <div class="text-center" id="Courses">
        <h1>Courses</h1>
      </div>
      <CardDeck id="Group_111">
        <Card id="Repeat_Grid_4">
          <Card.Img
            id="Group"
            id="Rectangle_71"
            src={require("../img/hailey-reed-Martin+Sepia+crop.jpg")}
          />
          <Card.Body id="Group_25">
            <Card.Title className="text-center">
              <h1>Guitar</h1>
            </Card.Title>
            <Card.Footer id="Time___3_pm">
              <span>Free</span>
            </Card.Footer>
            <Card.Footer id="Teacher__Ressie_Rottman">
              <span>Teacher: Ressie Rottman</span>
            </Card.Footer>
            <Card.Body id="Lorem_ipsum_dolor_sit_amet__co_cm">
              <span>You can learning guitar quick and easy</span>
            </Card.Body>
            <Link
              style={{
                borderRadius: "10px",
                border: "1px",
                width: "200px",
                height: "50px",
                backgroundColor: "rgba(10,171,154,1)"
              }}
              to="/course/guitar"
              className="text-center align-item-middle btn"
            >
              <span style={{ color: "white", font: "24px Nunito Sans" }}>
                Join Now
              </span>
            </Link>
          </Card.Body>
        </Card>
		<Card id="Repeat_Grid_4">
          <Card.Img
            id="Group"
            id="Rectangle_71"
            src={require("../img/piano-history.jpg")}
          />
          <Card.Body id="Group_25">
            <Card.Title className="text-center">
              <h1>Piano</h1>
            </Card.Title>
            <Card.Footer id="Time___3_pm">
              <span>Free</span>
            </Card.Footer>
            <Card.Footer id="Teacher__Ressie_Rottman">
              <span>Teacher: Nguyen Vu</span>
            </Card.Footer>
            <Card.Body id="Lorem_ipsum_dolor_sit_amet__co_cm">
              <span>You can learning guitar quick and easy</span>
            </Card.Body>
            <Link
              style={{
                borderRadius: "10px",
                border: "1px",
                width: "200px",
                height: "50px",
                backgroundColor: "rgba(10,171,154,1)"
              }}
              to="/course/piano"
              className="text-center align-item-middle btn"
            >
              <span style={{ color: "white", font: "24px Nunito Sans" }}>
                Join Now
              </span>
            </Link>
          </Card.Body>
        </Card>
		<Card id="Repeat_Grid_4">
          <Card.Img
            id="Group"
            id="Rectangle_71"
            src={require("../img/hailey-reed-Martin+Sepia+crop.jpg")}
          />
          <Card.Body id="Group_25">
            <Card.Title className="text-center">
              <h1>Violin</h1>
            </Card.Title>
            <Card.Footer id="Time___3_pm">
              <span>Free</span>
            </Card.Footer>
            <Card.Footer id="Teacher__Ressie_Rottman">
              <span>Teacher: Lan Huong</span>
            </Card.Footer>
            <Card.Body id="Lorem_ipsum_dolor_sit_amet__co_cm">
              <span>You can learning guitar quick and easy</span>
            </Card.Body>
            <Link
              style={{
                borderRadius: "10px",
                border: "1px",
                width: "200px",
                height: "50px",
                backgroundColor: "rgba(10,171,154,1)"
              }}
              to="/course/violin"
              className="text-center align-item-middle btn"
            >
              <span style={{ color: "white", font: "24px Nunito Sans" }}>
                Join Now
              </span>
            </Link>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}
