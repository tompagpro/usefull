import { createContext, useCallback, useEffect, useState } from "react";
import React from "react";
import { getTagsApi } from "../services/TagService";
import { useAuth } from "./useAuth";

export type Tag = {
  id: string;
  name: string;
};

type TagsContextType = {
  tags: Tag[];
  // Call it after any change that can create tags (new resource)
  refreshTags: () => Promise<void>;
};

type Props = { children: React.ReactNode };

export const TagsContext = createContext<TagsContextType>(
  {} as TagsContextType
);

export const TagsProvider = ({ children }: Props) => {
  const { token, logout, logoutTriggered } = useAuth();
  const [tags, setTags] = useState<Tag[]>([]);

  const refreshTags = useCallback(async () => {
    const data = await getTagsApi(token);
    if (data?.statusCode === 401) {
      if (!logoutTriggered) {
        logout();
      }
      return;
    }
    if (Array.isArray(data)) {
      setTags(data);
    }
  }, [token, logout, logoutTriggered]);

  useEffect(() => {
    refreshTags();
  }, [refreshTags]);

  return (
    <TagsContext.Provider value={{ tags, refreshTags }}>
      {children}
    </TagsContext.Provider>
  );
};
