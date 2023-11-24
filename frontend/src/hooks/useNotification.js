import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

const useNotification = () => {
  const { showNotification } = useContext(NotificationContext);
  return showNotification;
};

export default useNotification;
