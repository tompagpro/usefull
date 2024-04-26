import { Menu, MenuItem } from "react-pro-sidebar";
import { Typography } from "./Typography";
import { useEffect, useState } from "react";
import { getCategoriesWithToReadApi } from "../services/CategoryService";
import { useAuth } from "../context/useAuth";
import StorageIcon from "@mui/icons-material/Storage"; //back
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { Badge } from "./Badge";

type CategoryMenuProps = {
  collapsed: boolean;
};

type Category = {
  id: string;
  name: string;
  toRead: number;
};

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ collapsed }) => {
  const { token, logout } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesWithToReadApi(token);
      if (data.statusCode === 401) {
        logout();
      }
      setCategories(data);
      console.log("CATEGORIES", data);
    };

    fetchCategories().catch(console.error);
  }, [token, logout]);
  return (
    <>
      <div className="mb-2 px-6">
        <Typography
          variant="body2"
          className={`text-center font-semibold tracking-wide ${
            collapsed ? "opacity-0" : "opacity-70"
          }`}
        >
          Categories
        </Typography>
      </div>
      <Menu className="text-sm font-normal leading-4">
        {categories &&
          categories.map((item) => (
            <MenuItem
              icon={<StorageIcon className="text-primary" />}
              key={`MenuItem-${item.name}`}
              component={
                !collapsed ? (
                  <Link key={`Link-${item.name}`} to={`${item.id}/resources`} />
                ) : undefined
              }
              suffix={
                item.toRead && item.toRead > 0 ? (
                  <Badge
                    key={`Badge-${item.name}`}
                    variant="danger"
                    shape="circle"
                  >
                    {item.toRead}
                  </Badge>
                ) : (
                  ""
                )
              }
            >
              {item.name}
            </MenuItem>
          ))}
        <MenuItem
          className="text-center text-primary"
          component={
            !collapsed ? (
              <Link key={`Link-new-category`} to={"/usr/new/category"} />
            ) : undefined
          }
        >
          <AddCircleOutlineOutlinedIcon />
        </MenuItem>
      </Menu>
    </>
  );
};
