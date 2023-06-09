import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedCompoenet(props) {
  if (!localStorage.getItem("userToken")) {
    return <Navigate to={"/login"} />;
  } else {
    return props.children;
  }
}
