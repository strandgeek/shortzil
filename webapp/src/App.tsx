import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { MyLinks } from "./pages/MyLinks";
import { About } from "./pages/About";

function App() {
  return (
    <div className="overflow-y-auto py-8">
      <ToastContainer />
      <HashRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/my-links" element={<MyLinks />} />
          <Route path="/about" element={<About   />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
