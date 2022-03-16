import React from "react";
import Account from "./pages/Account";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/mycontacts" element={<Account />} />
      </Routes>
    </div>
  );
};

export default App;
