import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Account from "./pages/Account";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mycontacts" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
};

export default App;
