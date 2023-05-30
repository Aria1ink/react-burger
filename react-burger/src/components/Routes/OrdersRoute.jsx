import React from "react";
import { useLocation } from "react-router-dom";
import OrdersPage from "../../pages/orders/orders";
import FeedPage from "../../pages/feed/feed";
import OrderPage from "../../pages/order/order";

export default function OrdersRoute() {
  const location = useLocation();
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