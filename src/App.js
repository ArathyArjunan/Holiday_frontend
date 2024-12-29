// App.js
import React from "react";
import HomePage from "./Home/Home";
import HolidayListPage from "./Home/HolidayList";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/holidays" element={<HolidayListPage />} />
      </Routes>
  );
}

export default App;
