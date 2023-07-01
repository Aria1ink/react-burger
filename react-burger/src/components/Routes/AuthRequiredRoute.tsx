import React, { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRefreshToken } from "../../utils/tools/tokenTools";
import { getAuthUser } from "../../utils/tools/storeTools";
import Preloader from "../Preloader/Preloader";

type Props = {
  element: React.JSX.Element ;
};

export default function AuthRequiredRoute ({ element }: Props): React.JSX.Element {
  const location = useLocation();
  const user = useSelector(getAuthUser);

  if (user.isAuthenticated !== "loading") {
    if (user.isAuthenticated === "noauth" && !getRefreshToken()) {
    return (
      <Navigate to="/login" replace={false} state={{from: location.pathname}}/>
    )
  } else {
    return element;
  }
};
return(
  <Preloader />
);
};