import React, { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";

// import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"; //front
// import ConstructionIcon from "@mui/icons-material/Construction"; //devops
// import DesignServicesIcon from "@mui/icons-material/DesignServices"; //design
import StorageIcon from "@mui/icons-material/Storage"; //back

import { SidebarHeader } from "./SidebarHeader";
import { Badge } from "./Badge";
import { Typography } from "./Typography";
// import { Navbar } from "./Navbar";
import { useAuth } from "../context/useAuth";
import { getCategoriesWithToReadApi } from "../services/CategoryService";

type Category = {
  id: string;
  name: string;
  toRead: number;
};

type SidebarUserProps = {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggled: boolean;
  setToggled: (toggled: boolean) => void;
  broken: boolean;
  setBroken: (broken: boolean) => void;
};

export const SidebarUser: React.FC<SidebarUserProps> = ({ setBroken, collapsed, setCollapsed, toggled, setToggled }) => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  // const [collapsed, setCollapsed] = useState(false);
  // const [toggled, setToggled] = useState(false);
  // const [broken, setBroken] = useState(false);

  const navigate = useNavigate();

  const handleClickOnCollapsedSidebar = () => setCollapsed(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getCategoriesWithToReadApi(token);
      if (data.statusCode === 401) {
        navigate("/login");
      }
      setCategories(data);
      console.log("CATEGORIES", data);
    };

    fetchCategories().catch(console.error);
  }, [token, navigate]);

  return (
    <>
      <Sidebar
        collapsed={collapsed}
        toggled={toggled}
        onBackdropClick={() => setToggled(false)}
        onBreakPoint={setBroken}
        breakPoint="md"
        className="!fixed overflow-y-scroll top-0 bottom-0 bg-base-100"
        backgroundColor={"bg-base-100"}
        onClick={collapsed ? handleClickOnCollapsedSidebar : undefined}
      >
        <div className="flex flex-col">
          <SidebarHeader
            className="mt-4 mb-6"
            collapsed={collapsed}
            setCollapsed={setCollapsed}
          />
          {/* CATEGORIES PART */}

          <div className="flex-1 mb-8">
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
              {categories && categories.map((item) => (
                <MenuItem
                  icon={<StorageIcon className="text-primary" />}
                  key={`MenuItem-${item.name}`}
                  component={
                    !collapsed ? (
                      <Link key={`Link-${item.name}`} to={`${item.id}/ressources`} />
                    ) : undefined
                  }
                  suffix={
                    item.toRead &&
                    item.toRead > 0 ? (
                      <Badge
                        key={`Badge-${item.name}`}
                        variant="danger"
                        shape="circle"
                      >
                        {item.toRead}
                      </Badge>
                    ) : ""
                  }
                >
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
            {/* TAGS PART */}
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
              <MenuItem
                icon={<StorageIcon />}

              >
                Calendar
              </MenuItem>
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
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>

    </>
  );
};
