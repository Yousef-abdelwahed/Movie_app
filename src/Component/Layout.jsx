import React from "react";
import Navbar from "../Pages/Navbar";
import { Outlet } from "react-router-dom";
// import Footer from "../Pages/Footer";

export default function Layout({ userData, setUserData }) {
  return (
    <div>
      <div className="container">
        <Navbar userData={userData} setUserData={setUserData} />
        <Outlet></Outlet>
      </div>
      {/* <Footer /> */}
    </div>
  );
}
