import { Typography } from "./Typography";
import { useTags } from "../context/useTags";
import { Link, useMatch } from "react-router-dom";

type TagMenuProps = {
  collapsed: boolean;
};

export const TagMenu: React.FC<TagMenuProps> = ({ collapsed }) => {
  const { tags } = useTags();
  const match = useMatch("/usr/tags/:tagId");

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
                to={`/usr/tags/${tag.id}`}
                className={`rounded-md border px-2 py-0.5 text-xs transition-colors hover:border-primary hover:text-primary ${
                  match?.params.tagId === tag.id
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-base-300 text-base-content/80"
                }`}
              >
                #{tag.name}
              </Link>
            ))}
        </div>
      )}
    </>
  );
};
