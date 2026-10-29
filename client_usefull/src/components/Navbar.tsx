import React, { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

export const Navbar = () => {
  const { logout, user } = useAuth();
  const [theme, setTheme] = useState("usefull");
  // update state on toggle
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setTheme("usefull-dark");
    } else {
      setTheme("usefull");
    }
  };
  // set theme state in localstorage on mount & also update localstorage on state change
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme") || "usefull";
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar gap-2 px-4 pt-4 md:px-12">
      <div className="flex-1"></div>
      <div className="flex-none gap-3">
        <Link to={"/usr/new/resource"} className="btn btn-primary">
          <AddOutlinedIcon /> Ajouter une ressource
        </Link>

        <label className="flex cursor-pointer items-center gap-2 text-base-content/70">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="usefull-dark"
            onChange={handleToggle}
            className="toggle toggle-sm theme-controller"
            aria-label="Mode sombre"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            aria-label="Menu du compte"
            className="btn btn-ghost btn-circle avatar placeholder"
          >
            <div className="w-10 rounded-full border border-base-300 bg-base-100 text-primary">
              <span className="text-base font-semibold">
                {user?.username[0].toUpperCase()}
              </span>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content z-[1] mt-3 w-52 rounded-box border border-base-300 bg-base-100 p-2 shadow"
          >
            <li>
              <a className="justify-between">Profil</a>
            </li>
            <li id="logout" onClick={() => logout()}>
              <a>Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
