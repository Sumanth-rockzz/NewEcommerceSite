import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Typography } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  HomeFilled,
  WomanOutlined,
  ManOutlined,
} from "@ant-design/icons";

const MainMenu = () => {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    setSelectedKeys(location.pathname);
  }, [location.pathname]);
  const navigate = useNavigate();
  return (
    <div className="MainMenu">
      <Menu
        className="MainMenuHorizontal"
        mode="horizontal"
        onClick={(item) => {
          //item.key
          navigate(item.key);
        }}
        selectedKeys={[selectedKeys]}
        items={[
          {
            label: "Home",
            icon: <HomeFilled />,
            key: "/home",
          },
          {
            label: "Men",
            icon: <ManOutlined />,
            key: "/men",
            children: [
              {
                label: "Men's Shirts",
                key: "/mens-shirts",
              },
              {
                label: "Men's Shoes",
                key: "/mens-shoes",
              },
              {
                label: "Men's Watches",
                key: "/mens-watches",
              },
            ],
          },
          {
            label: "Women",
            icon: <WomanOutlined />,
            key: "/women",
            children: [
              {
                label: "Women's Dresses",
                key: "/womens-dresses",
              },
              {
                label: "Women's Shoes",
                key: "/womens-shoes",
              },
              {
                label: "Women's Watches",
                key: "/womens-watches",
              },
              {
                label: "Women's Bags",
                key: "/womens-bags",
              },
              {
                label: "Women's Jewellery",
                key: "/womens-jewellery",
              },
            ],
          },
          {
            label: "Accessories",
            icon: <ShopOutlined />,
            key: "/accessories",
          },
        ]}
      />
    </div>
  );
};

export default MainMenu;
