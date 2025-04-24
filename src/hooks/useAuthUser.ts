import {useSelector} from "react-redux";
import {RootState} from "../state/store";

export const useAuthUser = () => {
  return useSelector((state: RootState) => state.auth.user);
};