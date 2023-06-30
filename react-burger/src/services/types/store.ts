import type { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { ActionFromReducer } from "redux";
import { Ingredient } from "./ingredients";

export type Order = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}
export type OrderIngredients = {element: Ingredient, count: number }[];
export type Orders = Order[];
export type Feed = {
  orders: Orders;
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
  orders: Orders;
  success: boolean;
  total?: number;
  totalToday?: number;
}