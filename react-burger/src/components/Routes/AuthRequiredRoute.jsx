import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../utils/tools";
import PropTypes from "prop-types";

export default function AuthRequiredRoute ({ element }) {
  //const location = useLocation();
  const user = useSelector(getAuthUser);

  if (!user.isAuthenticated) {
    return (
      <Navigate to="/login" replace={false}/>
      //state={{from: location}}
    )
  }

  return element;
};

