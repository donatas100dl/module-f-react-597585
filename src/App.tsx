import React from "react";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import HomePage from "./page/homepage";
import Error404 from "./page/Error404";
import { LocationProvider } from "./utils/context/locationContext.jsx";
function App() {
  return (
    <>
      <LocationProvider>
        <Routes>
          <Route path="/react-template/" element={<HomePage />} />
          {/* <Route path="*" element={<Error404 />} /> */}
        </Routes>
      </LocationProvider>
    </>
  );
}

export default App;
