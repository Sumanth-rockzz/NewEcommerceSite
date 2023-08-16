import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { menuItems } from "./MenuItems";
import { Menu, Typography, Button, Space } from "antd";
import AppCart from "./AppCart";
import "../../App.css";
import { LoginOutlined, LogoutOutlined } from "@ant-design/icons";
import { authActions } from "../../redux-store/auth-slice";

// const calculateRemainingTime = (expirationTime) => {
//   const currentTime = new Date().getTime();
//   const adjExpirationTime = new Date(expirationTime).getTime();

//   const remainingTime = adjExpirationTime - currentTime;
//   return remainingTime;
// };

// const retrieveStoredToken = () => {
//   const storedToken = localStorage.getItem("token");
//   const storedRemainingDate = localStorage.getItem("expirationTime");

//   const remainingTime = calculateRemainingTime(storedRemainingDate);
//   if (remainingTime <= 600000) {
//     return null;
//   }
//   return {
//     token: storedToken,
//     duration: remainingTime,
//   };
// };

const MainMenu = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [selectedKeys, setSelectedKeys] = useState("/home");
  const token = useSelector((state) => state.auth.token);
  const isLoggedIn = !!token;

  const navigate = useNavigate();

  // const tokenData = retrieveStoredToken();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    navigate("/login");
  };

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);

  const renderSubMenu = (subMenu) => (
    <Menu.SubMenu
      className="subMenu"
      key={subMenu.key}
      icon={subMenu.icon}
      title={subMenu.label}
    >
      {subMenu.items.map((subItem) => (
        <Menu.Item className="menuItem" key={subItem.key}>
          {subItem.label}
        </Menu.Item>
      ))}
    </Menu.SubMenu>
  );

  return (
    <div className="MainMenu">
      <Typography.Title
        style={{
          fontSize: "1rem",
          margin: "10px",
          fontWeight: "bold",
          color: "blue",
        }}
      >
        InstaMart
      </Typography.Title>
      <Menu
        className="MainMenuHorizontal"
        style={{ flex: "auto", minWidth: 0 }}
        mode="horizontal"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
      >
        {menuItems.map((item) => {
          if (item.items) {
            return renderSubMenu(item);
          }
          return (
            <Menu.Item className="menuItem" key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          );
        })}
      </Menu>
      <Space size={20} style={{ marginRight: "30px" }}>
        {!isLoggedIn && (
          <NavLink to="/signup">
            <LoginOutlined />
            {"  "}
            <b>Signup</b>
          </NavLink>
        )}
        {!isLoggedIn && (
          <NavLink to="/login">
            <LoginOutlined />
            {"  "}
            <b>Login{"   "}</b>
          </NavLink>
        )}
        {isLoggedIn && (
          <Button
            icon={<LogoutOutlined rotate={270} />}
            onClick={logoutHandler}
          >
            Logout
          </Button>
        )}
        {isLoggedIn && <AppCart />}
      </Space>
    </div>
  );
};

export default MainMenu;
