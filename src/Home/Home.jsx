import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [year, setYear] = useState(""); // Store only the year
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch countries for the dropdown
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://calendarific.com/api/v2/countries?api_key=DRt8x1HwgnBRyWnSBh218vghkuNYgjfj"
        );
        const data = await response.json();
        if (data.meta.code === 200) {
          setCountries(data.response.countries);
        } else {
          setError("Failed to load countries.");
        }
      } catch (err) {
        console.error(err);
        setError("An error occurred while fetching countries.");
      }
    };
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    const selectedIso = e.target.value;
    setSelectedCountry(selectedIso);

    // Find and store the country code based on the selected ISO code
    const country = countries.find((c) => c["iso-3166"] === selectedIso);
    if (country) {
      setSelectedCountryCode(country["country_code"]);
    }
  };

  const handleYearChange = (e) => {
    // Extract only the year from the input value
    const fullDate = e.target.value;
    const selectedYear = fullDate.split("-")[0]; // Get the year part
    setYear(selectedYear);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCountry || !year) {
      setError("Both country and year are required!");
      return;
    }
    console.log("Selected Country Code:", selectedCountryCode); 
    navigate(`/holidays?country=${selectedCountry}&year=${year}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">Holiday Search</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 font-medium">Select Country:</label>
          <select
            value={selectedCountry}
            onChange={handleCountryChange}
            className="border border-gray-300 p-2 w-full rounded"
            required
          >
            <option value="">-- Select a Country --</option>
            {countries.map((country) => (
              <option key={country["iso-3166"]} value={country["iso-3166"]}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-2 font-medium">Select Year:</label>
          <input
            type="date"
            value={year ? `${year}-01-01` : ""}
            onChange={handleYearChange}
            className="border border-gray-300 p-2 w-full rounded"
            placeholder="Select year"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Search Holidays
        </button>
      </form>
    </div>
  );
};

export default HomePage;
