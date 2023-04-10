import axios from "axios";
import React, { useState } from "react";
import { requestsAuth } from "../Requests/Requests";
import { useNavigate } from "react-router-dom";
//import
import Joi from "joi";

export default function Register() {
  let navigate = useNavigate();
  //Error from API
  let [errorMessage, setErrorMessage] = useState([]);
  //custom Error JOI
  let [errorLists, setErrorLists] = useState([]);
  let [users, setUsers] = useState({
    first_name: "",
    last_name: "",
    age: "",
    email: "",
    password: "",
  });
  //handel API
  async function handleApiRegister() {
    const { data } = await axios.post(requestsAuth.fetchRegistration, users);
    handleError(data);
  }
  //handle Errors
  let handleError = (data) => {
    data.message === "success"
      ? navigate("/login")
      : setErrorMessage(data.message);
  };
  //handle store data
  const getUserData = (e) => {
    let myUser = { ...users };
    myUser[e.target.id] = e.target.value;
    setUsers(myUser);
  };
  function valedatForm() {
    let schema = Joi.object({
      first_name: Joi.string().required().alphanum().min(3).max(12), //alohanum == include a-z and 0-9
      last_name: Joi.string().required().alphanum().min(3).max(12),
      age: Joi.number().required().min(18).max(50),
      email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
      password: Joi.string().required().min(3).max(12),
    });
    return schema.validate(users, { abortEarly: false });
  }
  //handle default action
  const submitRegisterForm = (e) => {
    e.preventDefault();
    const valedate = valedatForm();
    if (valedate.error) {
      setErrorLists(valedate.error.details);
    } else {
      handleApiRegister();
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
      {console.log(errorMessage)}
      <form onSubmit={submitRegisterForm}>
        <div></div>
        <label htmlFor="firstName">First Name :</label>
        <input
          onChange={getUserData}
          type="text"
          className="form-control input-field"
          name="first_name"
          id="first_name"
        />
        {errorLists.filter((err) => err.context.label === "first_name")[0] ? (
          <div className="alert alert-danger">
            {
              errorLists.filter((err) => err.context.label === "first_name")[0]
                ?.message
            }
          </div>
        ) : (
          ""
        )}
        <label htmlFor="lastName">Last last :</label>
        <input
          onChange={getUserData}
          type="text"
          className="form-control input-field"
          name="last_name"
          id="last_name"
        />{" "}
        <label htmlFor="age">Age :</label>
        <input
          onChange={getUserData}
          type="number"
          className="form-control input-field"
          name="age"
          id="age"
        />
        <label htmlFor="email">Email :</label>
        <input
          onChange={getUserData}
          type="emial"
          className="form-control input-field"
          name="email"
          id="email"
        />
        <label htmlFor="passowrd">password :</label>
        <input
          onChange={getUserData}
          type="password"
          className="form-control input-field"
          name="password"
          id="password"
        />
        <button className="btn btn-info my-2"> Register</button>
      </form>
    </>
  );
}
