import { Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { Typography } from "./Typography";
import { useEffect, useState } from "react";
import { getCategoriesWithToReadApi } from "../services/CategoryService";
import { useAuth } from "../context/useAuth";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Link, useLocation } from "react-router-dom";

type CategoryMenuProps = {
  collapsed: boolean;
};

type CategoryWithToRead = {
  id: string;
  name: string;
  toRead: number;
};

// Colors read from the DaisyUI theme variables (--p = primary, --bc = base-content),
// so the menu follows usefull / usefull-dark without hardcoded values
const getMenuItemStyles = (collapsed: boolean): MenuItemStyles => ({
  button: ({ active }) => ({
    height: 36,
    margin: "0 8px",
    padding: collapsed ? "0 20px" : "0 12px",
    borderRadius: "var(--rounded-btn)",
    color: active ? "oklch(var(--p))" : "oklch(var(--bc) / 0.8)",
    backgroundColor: active ? "oklch(var(--p) / 0.1)" : "transparent",
    fontWeight: active ? 600 : 400,
    "&:hover": {
      color: active ? "oklch(var(--p))" : "oklch(var(--bc))",
      backgroundColor: active
        ? "oklch(var(--p) / 0.1)"
        : "oklch(var(--bc) / 0.05)",
    },
  }),
  icon: { minWidth: 24, width: 24, marginRight: 8 },
});

export const CategoryMenu: React.FC<CategoryMenuProps> = ({ collapsed }) => {
  const { token, logout, logoutTriggered } = useAuth();
  const { state } = useLocation();
  const [categories, setCategories] = useState<CategoryWithToRead[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesWithToReadApi(token);
      if (data.statusCode === 401 && !logoutTriggered) {
        logout();
      }
      setCategories(data);
    };

    fetchCategories();
  }, [token, logout, logoutTriggered]);
  return (
    <>
      <div className="mb-1 px-5">
        <Typography
          variant="body2"
          className={`font-semibold text-base-content/70 transition-opacity ${
            collapsed ? "opacity-0" : ""
          }`}
        >
          Catégories
        </Typography>
      </div>
      <Menu className="text-sm" menuItemStyles={getMenuItemStyles(collapsed)}>
        {categories &&
          categories.map((category) => {
            const active = state?.categoryId === category.id;
            return (
              <MenuItem
                icon={<FolderOutlinedIcon fontSize="small" />}
                key={`MenuItem-${category.name}`}
                active={active}
                component={
                  !collapsed ? (
                    <Link
                      key={`Link-${category.name}`}
                      to={`${category.name}/resources`}
                      state={{
                        categoryId: category.id,
                        categoryName: category.name,
                      }}
                    />
                  ) : undefined
                }
                suffix={
                  category.toRead > 0 ? (
                    <span
                      className={`badge badge-sm border-0 ${
                        active
                          ? "bg-primary text-primary-content"
                          : "bg-transparent text-base-content/70"
                      }`}
                    >
                      {category.toRead}
                    </span>
                  ) : undefined
                }
              >
                {category.name}
              </MenuItem>
            );
          })}
        <MenuItem
          icon={<AddOutlinedIcon fontSize="small" className="text-primary" />}
          component={
            !collapsed ? (
              <Link key={`Link-new-category`} to={"/usr/new/category"} />
            ) : undefined
          }
        >
          <span className="font-medium text-primary">Nouvelle catégorie</span>
        </MenuItem>
      </Menu>
    </>
  );
};
