import React from "react";
import { UserContext } from "./authContext";

export const useAuth = () => React.useContext(UserContext);
