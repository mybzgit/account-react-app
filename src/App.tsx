import React from "react";
import Account from "./pages/Account";
import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import EditForm from "./components/EditForm";

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/mycontacts" element={<Account />}>
          <Route path={"/mycontacts/newcontact"} element={<EditForm />} />
          <Route path={"/mycontacts/:contactId"} element={<EditForm />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
