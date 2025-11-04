import { Typography } from "./Typography";
import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { getTagsApi } from "../services/TagService";
import { Link } from "react-router-dom";

type TagMenuProps = {
  collapsed: boolean;
};

export type Tag = {
  id: string;
  name: string;
};

export const TagMenu: React.FC<TagMenuProps> = ({ collapsed }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const { token, logout, logoutTriggered } = useAuth();

  useEffect(() => {
    const fetchTags = async () => {
      const data = await getTagsApi(token);
      if (data.statusCode === 401 && !logoutTriggered) {
        logout();
      }
      setTags(data);
    };
    fetchTags();
  }, [token, logout, logoutTriggered]);

  return (
    <>
      <div className="mb-2 px-6 mt-8">
        <Typography
          className={`text-secondary text-center font-semibold tracking-wide ${
            collapsed ? "opacity-0" : "opacity-70"
          }`}
          variant="body2"
        >
          Tags
        </Typography>
      </div>

      {collapsed ? (
        <Typography className="text-center text-primary font-semibold tracking-wide">
          {tags.length}
          <br /> tag{tags.length > 1 && "s"}
        </Typography>
      ) : (
        <div className="flex gap-1 overflow-hidden ml-2">
          {tags &&
            tags.map((tag) => (
              <Link
                key={`Link-${tag.name}`}
                to={`${tag.name}/resources`}
                state={{ tagId: tag.id }}
              >
                <div
                  key={`Tag-${tag.name}`}
                  className="badge badge-outline badge-primary px-4 py-2"
                >
                  {tag.name}
                  {/* //TODO: add link and css */}
                </div>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};
