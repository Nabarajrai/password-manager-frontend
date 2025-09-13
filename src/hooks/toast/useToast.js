import { toast } from "react-toastify";

export const useToast = () => {
  const showSuccessToast = (message) => {
    toast.success(message);
  };

  return { showSuccessToast };
};
