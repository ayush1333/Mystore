import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import CompareProducts from './components/CompareProducts ';
import ProductDetails from './components/ProductDetails ';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ProductDetails />} />
          <Route path="/products" element={<ProductDetails />} />
          <Route path="/compare" element={<CompareProducts />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
