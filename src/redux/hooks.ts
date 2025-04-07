
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";


// Custom redux hooks for ts typeguard
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();