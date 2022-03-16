import React from "react";
import "./Account.css";
import AccountHeader from "../components/AccountHeader";
import ContactsList from "../components/ContactsList";

const Account: React.FC = () => {
  return (
    <div>
      <AccountHeader />
      <div className="main-container">
        <input className="search" placeholder="Type to search..." />
        <ContactsList />
        <div className="bottom-bar">
          <button type="button">Add contact</button>
        </div>
      </div>
    </div>
  );
};

export default Account;
