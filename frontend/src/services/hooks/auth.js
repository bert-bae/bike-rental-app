import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { save } from "../../redux/auth.slice";
import { UserRoleEnum } from "../../types/entities.type";
import authApi from "../api/auth";
import notify from "../../utils/notify";

export const useLoginMutation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = async ({ username, password }) => {
    return authApi.login(username, password);
  };

  return useMutation(login, {
    onError: () => {
      console.log("hello");
      notify("danger", {
        title: "Error",
        message: "Could not verify username and password",
      });
    },
    onSuccess: ({ data }) => {
      notify("success", {
        title: "Success",
        message: "Login successful",
      });
      data.role === UserRoleEnum.Admin ? navigate("/admin") : navigate("/");
      dispatch(save(data));
    },
  });
};
