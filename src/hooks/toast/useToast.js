import { toast } from "react-toastify";

export const useToast = () => {
  const showSuccessToast = (message, type = "success") => {
    toast[type](message);
  };

  return { showSuccessToast };
};
