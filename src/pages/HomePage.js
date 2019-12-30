import React from "react";
import MasterHead from "../components/MasterHead";
import AboutUs from "../components/AboutUs";
import Courses from "../components/Courses";
export default function HomePage(props) {
  return (
    <div id="Desktop_Version" className="Desktop_Version_Class">
      <MasterHead/>
      <AboutUs />
      <Courses />

    </div>
  );
}
