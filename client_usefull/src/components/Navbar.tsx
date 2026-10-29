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
    // console.log(localStorage.getItem("test"));
    const localTheme = localStorage.getItem("theme") || "usefull";
    // add custom data-theme attribute to html tag required to update theme using DaisyUI
    document.querySelector("html")?.setAttribute("data-theme", localTheme);
  }, [theme]);

  return (
    <div className="navbar bg-base-100 mt-4">
      <div className="flex-1">
        {/* <a className="btn btn-ghost text-xl">Ajouter des ressources +</a> */}
        {/* <Link
          to={"/usr/welcome"}
          className="ml-4 text-primary text-lg font-medium"
        >
          Accueil
        </Link> */}
      </div>
      <div className="flex-none gap-2">
        <Link
          to={"/usr/new/resource"}
          className="btn btn-outline btn-secondary"
        >
          <AddOutlinedIcon /> Ajouter une ressource
        </Link>
        {/* <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div> */}

        <label className="flex cursor-pointer gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            type="checkbox"
            value="usefull-dark"
            onChange={handleToggle}
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="avatar placeholder">
              <div className="bg-white text-primary border border-gray-900 rounded-full w-10">
                <span className="text-xl">
                  {user?.username[0].toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profil
                {/* <span className="badge">New</span> */}
              </a>
            </li>
            {/* <li>
              <a>Settings</a>
            </li> */}
            <li id="logout" onClick={() => logout()}>
              <a>Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
