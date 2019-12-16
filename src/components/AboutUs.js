import React from "react";
import { Row, Col, Image } from "react-bootstrap";

export default function AboutUs() {
  return (
    <Row className="Group_109_Class mt-5">
      <Col className="text-right justify-content-center pb-5">
        <img src={require("../img/Music-on-brain.jpg")} />
      </Col>
      <Col style={{ padding: "8%" }}>
        <div class="Group_3_Class">
          <div class="Science_Class">
            <span>Science</span>
          </div>
          <div data-type="Text" class="Lorem_ipsum_dolor_sit_amet__co_Class">
            <span>
              Music associated with our life. It's hard to imagine a world that
              lacks the notes: from mother lull you to sleep, instrumental for
              coffee Saturday afternoon, song honoring her pupil for graduation,
              to the tune thrill for wedding couple. Even when he is sad,
              painful, we also seek to melodies soothe the spirit.
            </span>
          </div>
        </div>
        <div class="Group_4_Class pt-5">
          <div
            data-type="Text"
            data-name="Learn anything"
            class="Learn_anything_Class"
          >
            <img src={require("../img/icon_1.png")} className="pr-3" />
            <span>Learn anything</span>
          </div>
          <div
            data-type="Text"
            data-name="Talk to our instructors"
            class="Talk_to_our_instructors_Class pt-2"
          >
            <img src={require("../img/icon_2.png")} className="pr-3" />
            <span>Talk to our instructors</span>
          </div>
          <div
            data-type="Text"
            data-name="Speak with others"
            class="Speak_with_others_Class pt-2"
          >
            <img src={require("../img/icon_3.png")} className="pr-3" />
            <span>Speak with others</span>
          </div>
        </div>
      </Col>
    </Row>
  );
}
