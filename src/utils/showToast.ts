import { toast } from "@prima/external/react-toastify";

type ToastType = "info" | "success" | "error" | "warning";

export const showToast = (message: string, type: ToastType = "info"): void => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "warning":
      toast.warn(message);
      break;
    default:
      toast.info(message);
  }
};
