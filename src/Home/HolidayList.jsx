import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./home.css";
import HolidayDetails from "./HolidayDetails";

const HolidayListPage = () => {
  const [holidays, setHolidays] = useState([]);
  const [filteredHolidays, setFilteredHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [holidayDetails, setHolidayDetails] = useState();
  const country = searchParams.get("country");
  const year = searchParams.get("year");

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/holidays/fetch?country=${country}&year=${year}`
        );

        const data = await response.json();
        if (data) {
          setHolidays(data);
          setFilteredHolidays(data);
        } else {
          setError("Failed to fetch holidays.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching holidays.");
      }
    };
    fetchHolidays();
  }, [country, year]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    setFilteredHolidays(
      holidays.filter((holiday) =>
        holiday.name.toLowerCase().includes(value)
      )
    );
  };

  const handleDetailsShow = (holiday) => {
    setHolidayDetails(holiday);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-6 max-w-xl mx-auto text-center">
        <h2 className="text-xl font-bold">Error</h2>
        <p className="text-gray-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-full mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Holidays in {country.toUpperCase()} for {year}
        </h2>

        {/* Search Bar */}
        <div className="mb-4 flex justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search holidays by name..."
            className="border border-gray-300 p-2 w-3/5 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <ul className="flex flex-row flex-wrap gap-2 justify-center">
          {filteredHolidays.map((holiday, index) => (
            <li
              onClick={() => handleDetailsShow(holiday)}
              key={index}
              className="cursor-pointer border w-[32%] h-52 border-gray-300 p-4 rounded-md shadow-md hover:shadow-lg transition overflow-y-scroll hide-scrollbar"
            >
              <h3 className="text-lg font-bold mb-2">{holiday.name}</h3>
              <p className="text-gray-600 mb-2">{holiday.description}</p>
              <p>
                <span className="font-medium">Date:</span> {holiday.date.iso}
              </p>
              <p>
                <span className="font-medium">Type:</span> {holiday.primary_type}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white border shadow-2xl w-4/12 h-4/6 rounded-lg p-4 flex flex-col justify-between">
            <HolidayDetails holidayDetails={holidayDetails} />
            <button
              className="border rounded-lg bg-gray-100 px-4 py-2 mt-4 self-end"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default HolidayListPage;
