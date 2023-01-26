import React from "react";
import "./App.css";
import Auth from "./components/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="dashboard/*" element={<Dashboard />} />
        <Route exact path="/" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <div className="flex justify-center text-6xl font-bold">
      404 Error: Page does not exist
    </div>
  );
}

export default App;
