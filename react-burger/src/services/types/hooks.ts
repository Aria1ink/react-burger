import { Path, RelativeRoutingType, To } from "react-router";

export interface LocationParams <T> extends Path {
  state: T;
  key: string;
};
export type LocationFrom = {
  from: string
};
export type NavigateFunction = {
  (
    to: To,
    options?: {
      replace?: boolean;
      state?: any;
      relative?: RelativeRoutingType;
    }
  ): void;
  (delta: number): void;
}