import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../utils/tools/storeTools";
import PropTypes from "prop-types";
import Preloader from "../Preloader/Preloader";

export default function OnlyNoAuthRoute ({ element }) {
const user = useSelector(getAuthUser);
const location = useLocation();


if (location.pathname === "/reset-password") {
  if (location.state && location.state.from === "/forgot-password"){
    return element;
  } else {
    return (
      <Navigate to="/" replace={true}/>
    );
  }
};

if (user.isAuthenticated !== "loading") {

  if (user.isAuthenticated === "auth") {
    return (
      <Navigate to="/" replace={true}/>
    )
  } else {
    return element;
  }
} 
return (
  <Preloader />
);
};

OnlyNoAuthRoute.propTypes = {
  element: PropTypes.element,
};