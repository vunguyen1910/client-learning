import React from "react";
import MasterHead from "../components/MasterHead";
import AboutUs from "../components/AboutUs";
import Courses from "../components/Courses";
import Teacher from "../components/Teacher";
import Footer from "../components/Footer"
export default function HomePage(props) {
  return (
    <div id="Desktop_Version" className="Desktop_Version_Class">
      <MasterHead/>
      <AboutUs />
      <Courses />
      <Teacher/>
      <Footer/>
    </div>
  );
}
