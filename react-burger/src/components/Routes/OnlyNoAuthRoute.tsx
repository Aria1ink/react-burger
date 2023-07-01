import React from "react";
import { Navigate } from "react-router-dom";
import { getAuthUser } from "../../utils/tools/storeTools";
import Preloader from "../Preloader/Preloader";
import { useAppLocation, useAppSelector } from "../../utils/tools/hooks";

type Props = {
  element: React.JSX.Element;
};

export default function OnlyNoAuthRoute ({ element }: Props) {
const user = useAppSelector(getAuthUser);
const location = useAppLocation();


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