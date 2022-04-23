import { useLoginMutation } from "../../services/hooks/auth";

const useLoginPage = () => {
  const { mutate: login } = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    login(data);
  };

  return {
    onSubmit: handleSubmit,
  };
};

export default useLoginPage;
