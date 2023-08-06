import React from "react";
import "../../App.css";
import { Typography } from "antd";
const AppFooter = () => {
  return (
    <div className="AppFooter">
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Privacy Policy
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Terms and Conditions
      </Typography.Link>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Return/Refund Policy
      </Typography.Link>
      <Typography.Link href="tel:+91 8073953662">
        +91 8073953662
      </Typography.Link>
    </div>
  );
};

export default AppFooter;
