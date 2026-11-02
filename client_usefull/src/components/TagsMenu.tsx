import { Typography } from "./Typography";
import { useTags } from "../context/useTags";
import { Link } from "react-router-dom";

type TagMenuProps = {
  collapsed: boolean;
};

export const TagMenu: React.FC<TagMenuProps> = ({ collapsed }) => {
  const { tags } = useTags();

  return (
    <>
      <div className="mb-2 mt-6 px-5">
        <Typography
          className={`font-semibold text-base-content/70 transition-opacity ${
            collapsed ? "opacity-0" : ""
          }`}
          variant="body2"
        >
          Tags
        </Typography>
      </div>

      {collapsed ? (
        <Typography
          variant="body2"
          className="text-center font-semibold text-base-content/70"
        >
          {tags.length}
          <br /> tag{tags.length > 1 && "s"}
        </Typography>
      ) : (
        <div className="flex flex-wrap gap-1.5 px-5">
          {tags &&
            tags.map((tag) => (
              <Link
                key={`Link-${tag.name}`}
                to={`${tag.name}/resources`}
                state={{ tagId: tag.id, tagName: tag.name }}
                className="rounded-md border border-base-300 px-2 py-0.5 text-xs text-base-content/80 transition-colors hover:border-primary hover:text-primary"
              >
                #{tag.name}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};
