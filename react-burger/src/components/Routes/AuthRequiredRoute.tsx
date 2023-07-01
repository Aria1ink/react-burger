import React from "react";
import { Navigate } from "react-router-dom";
import { getRefreshToken } from "../../utils/tools/tokenTools";
import { getAuthUser } from "../../utils/tools/storeTools";
import Preloader from "../Preloader/Preloader";
import { useAppLocation, useAppSelector } from "../../utils/tools/hooks";

type Props = {
  element: React.JSX.Element ;
};

export default function AuthRequiredRoute ({ element }: Props): React.JSX.Element {
  const location = useAppLocation();
  const user = useAppSelector(getAuthUser);

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