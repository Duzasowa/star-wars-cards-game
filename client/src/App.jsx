import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CartsList from "./pages/CartsList";
import Game from "./pages/Game";
import Home from "./pages/Home";
import Join from "./pages/Join";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart-list" element={<CartsList />} />
        <Route path="/joinToEmpireArmy" element={<Join />} />
        <Route path="/game" element={<Game />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
