import { useState } from "react";
import { Navbar } from "../components/Navbar";
// import { Resources } from "../components/Resources";
import { SidebarUser } from "../components/SidebarUser";
import { Outlet } from "react-router-dom";

export const ConnectedUser = () => {
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  return (
    <div className="flex">
      <SidebarUser
        broken={broken}
        setBroken={setBroken}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        toggled={toggled}
        setToggled={setToggled}
      />

      <main
        // className={`w-full transition duration-300 ml-${
        //   broken ? "0" : collapsed ? "20" : "64"
        // }`}
        style={{
          marginLeft: broken ? "0px" : collapsed ? "80px" : "250px",
          transition: "margin-left 0.3s",
          width: "100%",
        }}
      >
        <Navbar />
        <div className="px-5 py-4">
          <div className="pb-4">
            {broken && (
              <button
                className="sb-button"
                onClick={() => setToggled(!toggled)}
              >
                Toggle button
              </button>
            )}

            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
