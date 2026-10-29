import { toast } from "react-toastify";

export const handleError = (error: unknown) => {
  // `error` can be anything (Error, string, object…): check it is an Error before reading .message
  const message =
    error instanceof Error && error.message
      ? error.message
      : "Une erreur est survenue.";
  console.error("Error handler", error);
  toast.warning(message, { position: "bottom-right" });
};
