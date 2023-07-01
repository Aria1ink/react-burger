import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../services/store"
import { NavigateFunction, Params, useLocation, useNavigate, useParams } from "react-router"
import { LocationFrom, LocationParams } from "../../services/types/hooks";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppLocation: () => LocationParams<LocationFrom> = useLocation;
export const useAppNavigate: () => NavigateFunction = useNavigate;
export const useAppParams: () => Readonly<Params<string>> = useParams;