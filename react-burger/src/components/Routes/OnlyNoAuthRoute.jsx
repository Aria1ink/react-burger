import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthUser } from "../../utils/tools";
import PropTypes from "prop-types";

export default function OnlyNoAuthRoute ({ element }) {

  const user = useSelector(getAuthUser);

  if (user.isAuthenticated) {
    return (
      <Navigate to="/" replace={true}/>
    )
  }

  return element;
};

