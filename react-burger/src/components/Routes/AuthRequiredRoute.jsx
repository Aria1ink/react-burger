import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../utils/tools";
import Preloader from "../Preloader/Preloader";
import PropTypes from "prop-types";

export default function AuthRequiredRoute ({ element }) {
  const location = useLocation();
  const user = useSelector(getAuthUser);

  if (user.isAuthenticated !== "loading") {

    if (user.isAuthenticated === "noauth") {
    return (
      <Navigate to="/login" replace={false} state={{from: location.pathname}}/>
    )
  } else {
    return element;
  };
};
return(
  <Preloader />
);
};

