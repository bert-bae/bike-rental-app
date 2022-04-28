import { Store } from "react-notifications-component";

const notify = (type: string, input: { title: string; message: string }) => {
  Store.addNotification({
    title: input.title,
    message: input.message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  });
};

export default notify;
