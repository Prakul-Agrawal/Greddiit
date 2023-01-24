import React from "react";
import './App.css';
import Auth from "./components/AuthPage";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProfilePage from "./components/ProfilePage";
import Navbar from "./components/Navbar";
function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route exact path="/" element={<Auth />} />
              <Route element={<Navbar />}>
                  <Route path='/profile' element={<ProfilePage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
  );
}

function NotFound() {
          return <>404 Error: Page does not exist</>;
}

export default App;
