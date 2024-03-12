import React from "react";
import {
  Sidebar,
  Menu,
  MenuItem,

} from "react-pro-sidebar";
import { Link } from "react-router-dom";

import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"; //front
import ConstructionIcon from "@mui/icons-material/Construction"; //devops
import DesignServicesIcon from "@mui/icons-material/DesignServices"; //design
import StorageIcon from "@mui/icons-material/Storage"; //back

import { SidebarHeader } from "./SidebarHeader";
import { Badge } from "./Badge";
import { Typography } from "./Typography";
import { Navbar } from "./Navbar";


const CATEGORIE_ICON = [
  { icon: StorageIcon, title: "Back-end" },
  { icon: DesignServicesIcon, title: "Design", toRead: 2 },
  { icon: ConstructionIcon, title: "DevOps", toRead: 4 },
  { icon: AutoFixHighIcon, title: "Front-end", toRead: 12 },
  { icon: AutoFixHighIcon, title: "Super longueeeeeeeeeeeeeeeeeer"},
];

export const SidebarUser: React.FC = () => {
  const [collapsed, setCollapsed] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  const [broken, setBroken] = React.useState(false);

  const handleClickOnCollapsedSidebar = () => setCollapsed(false);

  return (
    <div className="flex">
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
                className="text-center font-semibold tracking-wide"
                style={{ opacity: collapsed ? 0 : 0.7 }}
              >
                Categories
              </Typography>
            </div>
            <Menu className="text-sm font-normal leading-4">
              {CATEGORIE_ICON.map((item) => (
                <MenuItem
                  icon={<item.icon className="text-primary" />}
                  key={`MenuItem-${item.title}`}
                  component={ !collapsed ? <Link key={`Link-${item.title}`} to={item.title} /> : undefined}
                  suffix={
                    item.toRead &&
                    item.toRead > 0 && (
                      <Badge
                        key={`Badge-${item.title}`}
                        variant="danger"
                        shape="circle"
                      >
                        {item.toRead}
                      </Badge>
                    )
                  }
                >
                    {item.title}
                </MenuItem>
              ))}
            </Menu>
            {/* TAGS PART */}
            <div className="mb-2 px-6 mt-8">
              <Typography
                className="text-center font-semibold tracking-wide"
                variant="body2"
                style={{ opacity: collapsed ? 0 : 0.7 }}
              >
                Tags
              </Typography>
            </div>

            <Menu /*menuItemStyles={menuItemStyles}*/>
              <MenuItem
                icon={<StorageIcon />}
                suffix={<Badge variant="success">New</Badge>}
              >
                Calendar
              </MenuItem>
              <MenuItem icon={<StorageIcon />}>Calendar</MenuItem>
              <MenuItem icon={<StorageIcon />}>Documentation</MenuItem>

              <MenuItem disabled icon={<StorageIcon />}>
                Examples
              </MenuItem>
            </Menu>
          </div>
          {/* <SidebarFooter collapsed={collapsed} /> */}
        </div>
      </Sidebar>
      <main
        style={{
          marginLeft: broken ? "0px" : collapsed ? "80px" : "250px",
          transition: "margin-left 0.3s",
          width: "100%",
        }}
      >
        <Navbar />
        <div style={{ padding: "16px 24px", color: "#44596e" }}>
          <div style={{ paddingBottom: "16px" }}>
            {broken && (
              <button
                className="sb-button"
                onClick={() => setToggled(!toggled)}
              >
                Toggle Prout
              </button>
            )}
          </div>

          <div style={{ padding: "0 8px" }}>
            <div className="flex flex-wrap gap-4">
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">
                    Card title! super spuer super usper
                    uspersuefsrpepsoefepspeeppesp logng lgong long titllllllleee
                  </h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Card title!</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-primary">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
