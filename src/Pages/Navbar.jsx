import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ userData, setUserData }) {
  let navigate = useNavigate();
  function handleLogout() {
    //remove user token
    localStorage.removeItem("userToken");
    //setuserData (null);
    setUserData(null);
    //navigate to login page
    navigate("/login");
  }
  return (
    <nav className="p-2 d-flex justify-content-between">
      <div className="left-nav d-flex justify-contant-center align-items-center ">
        <h1 className="m-0">Noxe</h1>
        {userData ? (
          <ul className="list-unstyled m-0  flex-md-row flex-column  d-flex justify-contant-center align-items-center ">
            <li className="ms-5">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item px-2">
              <NavLink to="movie" className="nav-link">
                {" "}
                Movie{" "}
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="tvshow" className="nav-link">
                Tvshow{" "}
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="people" className="nav-link">
                {" "}
                People{" "}
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="about" className="nav-link">
                {" "}
                About{" "}
              </NavLink>
            </li>
            <li className="px-2">
              <NavLink to="network" className="nav-link">
                {" "}
                Network{" "}
              </NavLink>
            </li>
          </ul>
        ) : (
          ""
        )}
      </div>
      <div className="right-nav flex-md-row flex-column d-flex justify-contant-center align-items-center ">
        <ul className=" list-unstyled m-0  flex-md-row flex-column  d-flex justify-contant-center align-items-center me-5">
          <i className="fab fa-facebook mx-1 pointer hov_icon"></i>
          <i className="fab fa-twitter mx-1 pointer hov_icon"></i>
          <i className="fab fa-instgram mx-1 pointer hov_icon"></i>
          <i className="fab fa-spotify mx-1 pointer hov_icon"></i>
          <i className="fab fa-youtube mx-1 pointer hov_icon"></i>
        </ul>
        <ul className="list-unstyled m-0  flex-md-row flex-column  d-flex justify-contant-center align-items-center ">
          {userData ? (
            <>
              <li className="me-1">
                <span
                  className="nav-link cursor-pointer me-4"
                  role="button"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </li>
              <NavLink className="nav-link f-white" to="profile">
                Profile
              </NavLink>
            </>
          ) : (
            <>
              <li className="nav-item ms-2">
                <NavLink className="nav-link " to="login">
                  Login
                </NavLink>
              </li>
              <li className="ms-2 nav-item">
                <NavLink className="nav-link f-white mx-2  " to="register">
                  Register
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
