import { Menu, MenuItem } from "react-pro-sidebar";
import { Typography } from "./Typography";
import StorageIcon from "@mui/icons-material/Storage"; //back

type TagsMenuProps = {
  collapsed: boolean;
};
export const TagsMenu: React.FC<TagsMenuProps> = ({ collapsed }) => {
  return (
    <>
      <div className="mb-2 px-6 mt-8">
        <Typography
          className={`text-center font-semibold tracking-wide ${
            collapsed ? "opacity-0" : "opacity-70"
          }`}
          variant="body2"
        >
          Tags
        </Typography>
      </div>

      <Menu /*menuItemStyles={menuItemStyles}*/>
        <MenuItem icon={<StorageIcon />}>Calendar</MenuItem>
        <MenuItem icon={<StorageIcon />}>Calendar</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>
        <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>

        <MenuItem disabled icon={<StorageIcon />}>
          Examples
        </MenuItem>
      </Menu>
    </>
  );
};
