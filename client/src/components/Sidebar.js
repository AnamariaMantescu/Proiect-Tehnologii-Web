import React, { useState } from "react";
import { FaTh, FaBars } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ children }) => {
  // useLocation hook is used to get the current location of the app
  const location = useLocation();
  // check whether user is on login page or not
  const loginPage = location.pathname === "/";

  // useState hook to keep track of whether sidebar is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // toggle function to change the state of sidebar
  const toggle = () => setIsOpen(!isOpen);

  // menu items for the sidebar
  const menuItem = [
    {
      path: "/Home",
      name: "Notite",
      icon: <FaTh />,
    },

    {
      path: "/",
      name: "Sign Out",
      icon: <RiLogoutCircleLine />,
    },
  ];

  return (
    <div
      className="sidebar-container"
      style={{ display: loginPage ? "none" : null }}
    >
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link">
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
