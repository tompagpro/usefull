import React from "react";
import { TagsContext } from "./tagsContext";

export const useTags = () => React.useContext(TagsContext);
