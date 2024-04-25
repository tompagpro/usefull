// import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
  // const navigate = useNavigate();
  const message = error.message || "Une erreur est survenue.";
  console.error("Error handler", error);
  toast.warning(message, { position: "bottom-right" });
}
