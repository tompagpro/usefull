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

type CategoryWithToRead = {
  id: string;
  name: string;
  toRead: number;
};

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ collapsed }) => {
  const { token, logout, logoutTriggered } = useAuth();
  const [categories, setCategories] = useState<CategoryWithToRead[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesWithToReadApi(token);
      if (data.statusCode === 401 && !logoutTriggered) {
        logout();
      }
      setCategories(data);
      // console.log("CATEGORIES", data);
    };

    fetchCategories();
  }, [token, logout, logoutTriggered]);
  return (
    <>
      <div className="mb-2 px-6">
        <Typography
          variant="body2"
          className={`text-secondary text-center font-semibold tracking-wide ${
            collapsed ? "opacity-0" : "opacity-70"
          }`}
        >
          Categories
        </Typography>
      </div>
      <Menu className="text-sm font-normal leading-4">
        {categories &&
          categories.map((category) => (
            <MenuItem
              icon={<StorageIcon className="text-primary" />}
              key={`MenuItem-${category.name}`}
              component={
                !collapsed ? (
                  <Link
                    key={`Link-${category.name}`}
                    to={`${category.name}/resources`}
                    state={{ categoryId: category.id, categoryName: category.name }}
                  />
                ) : undefined
              }
              suffix={
                category.toRead && category.toRead > 0 ? (
                  <Badge
                    key={`Badge-${category.name}`}
                    variant="danger"
                    shape="circle"
                  >
                    {category.toRead}
                  </Badge>
                ) : (
                  ""
                )
              }
            >
              {category.name}
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
