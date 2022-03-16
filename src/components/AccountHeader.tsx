import React from "react";
import "./AccountHeader.css";

const AccountHeader: React.FC = () => {
  return (
    <div className="header">
      <div className="userinfo">Hello, 'username'!</div>
      <button className="signout" type="button">Sign out</button>
    </div>
  );
};

export default AccountHeader;
