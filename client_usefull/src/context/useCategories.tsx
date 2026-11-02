import React from "react";
import { CategoriesContext } from "./categoriesContext";

export const useCategories = () => React.useContext(CategoriesContext);
