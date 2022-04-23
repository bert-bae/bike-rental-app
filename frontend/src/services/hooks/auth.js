import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { save } from "../../redux/auth.slice";
import { UserRoleEnum } from "../../types/entities.type";
import authApi from "../api/auth";

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async ({ username, password }) => {
    return authApi.login(username, password);
  };

  return useMutation(login, {
    onError: () => {
      console.log("handleErrror");
    },
    onSuccess: ({ data }) => {
      dispatch(save(data));
      data.role === UserRoleEnum.Admin ? navigate("/admin") : navigate("/");
    },
  });
};
