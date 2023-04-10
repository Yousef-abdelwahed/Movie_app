import axios from "axios";
import React, { useState } from "react";
import { requestsAuth } from "../Requests/Requests";
//import
import Joi from "joi";
import { useNavigate } from "react-router-dom";

export default function Login({ saveUserData }) {
  let navigate = useNavigate();
  //Error from API
  // let [errorMessage, setErrorMessage] = useState([]);
  //custom Error JOI
  let [errorLists, setErrorLists] = useState([]);
  let [users, setUsers] = useState({
    email: "",
    password: "",
  });
  //handel API
  async function handleApiLogin() {
    const { data } = await axios.post(requestsAuth.fetchLogin, users);
    handleError(data);
  }
  //handle Errors
  let handleError = (data) => {
    if (data.message === "success") {
      localStorage.setItem("userToken", data.token);
      saveUserData();
      navigate("/");
    } else {
      valedatForm();
    }
  };
  //handle store data
  const getUserData = (e) => {
    let myUser = { ...users };
    myUser[e.target.id] = e.target.value;
    setUsers(myUser);
  };
  function valedatForm() {
    let schema = Joi.object({
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(3).max(12),
    });
    return schema.validate(users, { abortEarly: false });
  }
  //handle default action
  const submitLoginForm = (e) => {
    e.preventDefault();
    const valedate = valedatForm();
    if (valedate.error) {
      setErrorLists(valedate.error.details);
    } else {
      handleApiLogin();
    }
  };
  return (
    <>
      {/* {errorMessage.length > 0 ? (
        <div className="alert alert-danger">{errorMessage}</div>
      ) : (
        ""
      )} */}

      {/* {errorLists.map((error, index) => (
        <div className="alert alert-danger" key={index}>
          {error.message}
        </div>
      ))} */}
      <form onSubmit={submitLoginForm}>
        <label htmlFor="email">Email :</label>
        <input
          onChange={getUserData}
          type="emial"
          className="form-control input-field"
          name="email"
          id="email"
        />
        {errorLists.filter((err) => err.context.label === "email")[0] ? (
          <div className="alert alert-danger">
            {
              errorLists.filter((err) => err.context.label === "email")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}
        <label htmlFor="passowrd">password :</label>
        <input
          onChange={getUserData}
          type="password"
          className="form-control input-field"
          name="password"
          id="password"
        />
        {errorLists.filter((err) => err.context.label === "passowrd")[0] ? (
          <div className="alert alert-danger">
            {
              errorLists.filter((err) => err.context.label === "passowrd")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}
        <button className="btn btn-info my-2"> Login</button>
      </form>
    </>
  );
}
