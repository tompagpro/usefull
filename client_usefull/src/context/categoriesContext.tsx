import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { getCategoriesWithToReadApi } from "../services/CategoryService";
import { useAuth } from "./useAuth";

export type CategoryWithToRead = {
  id: string;
  name: string;
  toRead: number;
};

type CategoriesContextType = {
  categories: CategoryWithToRead[];
  // Call it after any change that affects categories or "to read" counts
  refreshCategories: () => Promise<void>;
};

type Props = { children: React.ReactNode };

export const CategoriesContext = createContext<CategoriesContextType>(
  {} as CategoriesContextType
);

export const CategoriesProvider = ({ children }: Props) => {
  const { token, logout, logoutTriggered } = useAuth();
  const [categories, setCategories] = useState<CategoryWithToRead[]>([]);

  const refreshCategories = useCallback(async () => {
    const data = await getCategoriesWithToReadApi(token);
    if (data?.statusCode === 401) {
      if (!logoutTriggered) {
        logout();
      }
      return;
    }
    // On a network error data is undefined: keep the current list
    if (Array.isArray(data)) {
      setCategories(data);
    }
  }, [token, logout, logoutTriggered]);

  useEffect(() => {
    refreshCategories();
  }, [refreshCategories]);

  return (
    <CategoriesContext.Provider value={{ categories, refreshCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};
