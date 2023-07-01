import React from "react";
import OrdersPage from "../../pages/orders/orders";
import FeedPage from "../../pages/feed/feed";
import OrderPage from "../../pages/order/order";
import { useAppLocation } from "../../utils/tools/hooks";

export default function OrdersRoute() {
  const location = useAppLocation();
  if (location.state && location.state.from === "/profile/orders") {
    return (
      <OrdersPage />
    )
  }
  if (location.state && location.state.from === "/feed") {
    return (
      <FeedPage />
    )
  }
  return (
    <OrderPage />
  );
};