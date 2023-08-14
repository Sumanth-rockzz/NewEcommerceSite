import {
  ShopOutlined,
  HomeFilled,
  WomanOutlined,
  ManOutlined,
  ContactsOutlined,
  InfoCircleOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
export const menuItems = [
  {
    label: "Home",
    icon: <HomeFilled />,
    key: "/home",
  },
  {
    label: "Men",
    icon: <ManOutlined />,
    key: "/men",
    items: [
      {
        label: "Men's Shirts",
        key: "/category/mens-shirts",
      },
      {
        label: "Men's Shoes",
        key: "/category/mens-shoes",
      },
      {
        label: "Men's Watches",
        key: "/category/mens-watches",
      },
    ],
  },
  {
    label: "Women",
    icon: <WomanOutlined />,
    key: "/category/women",
    items: [
      {
        label: "Women's Dresses",
        key: "/category/womens-dresses",
      },
      {
        label: "Women's Shoes",
        key: "/category/womens-shoes",
      },
      {
        label: "Women's Watches",
        key: "/category/womens-watches",
      },
      {
        label: "Women's Bags",
        key: "/category/womens-bags",
      },
      {
        label: "Women's Jewellery",
        key: "/category/womens-jewellery",
      },
    ],
  },
  {
    label: "Fragrances",
    icon: <ShopOutlined />,
    key: "/category/fragrances",
  },
  {
    label: "My Orders",
    icon: <OrderedListOutlined />,
    key: "/my-orders",
  },
  {
    label: "About Us",
    icon: <InfoCircleOutlined />,
    key: "/about-us",
  },
  {
    label: "Contact Us",
    icon: <ContactsOutlined />,
    key: "/contact-us",
  },
];
