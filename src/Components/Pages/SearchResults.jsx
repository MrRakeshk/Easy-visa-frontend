// pages/SearchResults.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VisaCard from "../components/VisaCard"; // adjust path

const SearchResults = () => {
  const [visas, setVisas] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("country")?.toLowerCase();

  useEffect(() => {
    fetch("https://easy-visa-backend.vercel.app/Visa")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((visa) =>
          visa.countryName.toLowerCase().includes(searchTerm)
        );
        setVisas(filtered);
      });
  }, [searchTerm]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Search Results for "{searchTerm}"
      </h2>
      {visas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visas.map((visa) => (
            <VisaCard key={visa._id} visa={visa} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No visas found for that country.</p>
      )}
    </div>
  );
};

export default SearchResults;
