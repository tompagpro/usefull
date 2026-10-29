import { useState } from "react";
import { Navbar } from "../components/Navbar";
import { SidebarUser } from "../components/SidebarUser";
import { Outlet } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export const ConnectedUser = () => {
  const [broken, setBroken] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);

  // Full class names only: Tailwind can't detect classes built with `ml-${x}`
  const mainMargin = broken ? "ml-0" : collapsed ? "ml-20" : "ml-[250px]";

  return (
    <div className="flex min-h-screen">
      <SidebarUser
        broken={broken}
        setBroken={setBroken}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        toggled={toggled}
        setToggled={setToggled}
      />

      <main
        className={`${mainMargin} w-full min-w-0 transition-[margin] duration-300`}
      >
        <Navbar />
        <div className="px-4 pb-8 md:px-12">
          {broken && (
            <button
              className="btn btn-ghost btn-square mb-4"
              aria-label="Ouvrir le menu"
              onClick={() => setToggled(!toggled)}
            >
              <MenuIcon />
            </button>
          )}

          <Outlet />
        </div>
      </main>
    </div>
  );
};
