import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ActionFromReducer } from "redux";

export type Orders = string[];
export type Feed = {
  orders: Orders[];
  total: number;
  totalToday: number;
};
export type ActionsForSocket = {
  wsInit: ActionCreatorWithoutPayload<"ws/wsOrdersConnect"> | ActionCreatorWithoutPayload<"ws/wsFeedConnect">,
  onOpen: ActionCreatorWithoutPayload<"ws/wsOrdersSuccess"> | ActionCreatorWithoutPayload<"ws/wsFeedSuccess">, 
  onClose: ActionCreatorWithoutPayload<"ws/wsOrdersDisconnect"> | ActionCreatorWithoutPayload<"ws/wsFeedDisconnect">, 
  onMessage: ActionCreatorWithPayload<socketData, "ws/wsOrdersGetMessage"> | ActionCreatorWithPayload<socketData, "ws/wsFeedGetMessage">, 
}

export type socketData = {
  orders: Orders[];
  success: boolean;
  total?: number;
  totalToday?: number;
}