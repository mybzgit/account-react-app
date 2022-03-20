import React, { Fragment } from "react";
import Account from "./pages/Account";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import PopupEditForm from "./components/PopupEditForm";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/mycontacts" element={<Account />}>
        <Route path={"/mycontacts/newcontact"} element={<PopupEditForm />} />
        <Route path={"/mycontacts/:contactId"} element={<PopupEditForm />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default App;
