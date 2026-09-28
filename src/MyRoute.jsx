import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./pages/Layout";
import Homepage from "./pages/Home";
import Active from "./pages/Active";
import Completed from "./pages/Completed";
import Categories from "./pages/Categories";

const MyRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />

          <Route path="/active" element={<Active />} />

          <Route path="/completed" element={<Completed />} />

          <Route path="/categories" element={<Categories />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoute;
