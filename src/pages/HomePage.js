import React from "react";
import MasterHead from "../components/MasterHead";
import AboutUs from "../components/AboutUs";
import Courses from "../components/Courses";
import Contact from "../components/Contact"
import Feature from "../components/Feature"
import Teacher from "../components/Teacher"
import Blog from "../components/Blog"
import Client from "../components/Client"
import Sub from "../components/Sub" 
export default function HomePage(props) {
  return (
    <div id="Desktop_Version" className="Desktop_Version_Class">
      <MasterHead/>
      <AboutUs />
      <Courses />

    </div>
  );
}
