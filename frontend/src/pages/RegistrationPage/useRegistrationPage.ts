import React from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../../services/hooks/users";
import { TUserModel, UserRoleEnum } from "../../types/entities.type";

const useLoginPage = () => {
  const navigate = useNavigate();
  const { mutate: createUser, isSuccess } = useCreateUserMutation();

  const handleSubmit = (data: TUserModel) => {
    createUser({ ...data, role: UserRoleEnum.Member });
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return {
    onSubmit: handleSubmit,
    onCancel: () => navigate("/login"),
  };
};

export default useLoginPage;
