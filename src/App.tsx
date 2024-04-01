import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Products from "./components/Products";
// import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import Home from "./pages/Home";
import Header from "./components/Header";
import Landing from "./pages/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Quiz from "./pages/Quiz";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/quiz" element={<Quiz />}></Route>
      </Routes>
    </div>
  );
}

export default App;
