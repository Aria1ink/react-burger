import { Ingredient } from "./ingredients";
import { Order } from "./store";
import { User } from "./user";

export type UrlRequest = (
  urlParams: string,
  method: string,
  headers: {
    [name: string]: string;
  } | null,
  body: Body | null) => Promise<any>;
export type Token = string;
export type Email = string;
export type Name = string;
export type Password = string;
export type OrderItemsId = string[];
export type Body = {
  [name: string]: string | OrderItemsId;
};
export type ServerResponse<T> = {
  success: boolean;
} & T;
export type RefreshResponse = ServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export type IngredientsResponse = ServerResponse<{
  data: Ingredient[];
}>;
export type UserResponse = ServerResponse<{
  user: User;
}>;
export type NoLoginResponse = ServerResponse<{
  message: string;
}>;
export type OrderResponse = ServerResponse<{
  name: string;
  order: Order;
}>;
export type LoginResponse = ServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: User;
}>;