import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VisaCard from "../../../Cards/VisaCard";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
const LatestVisas = () => {
  const [visas, setVisas] = useState([]);
  const navigate = useNavigate();
  const { theme, Toast } = useContext(AuthContext);
  useEffect(() => {
    fetch("https://visaease.vercel.app/Visa")
      .then((res) => res.json())
      .then((data) => {
        const latestVisas = [...data].reverse().slice(0, 6);
        setVisas(latestVisas);
      })
      .catch((err) => Toast(err.message, "error"));
  }, []);

  return (
    <section
      className={`container mx-auto my-10 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-center mb-8">
        Explore the Latest Visa Opportunities 🌍✈️
      </h2>
      <p className="text-xl text-center text-gray-300 w-[90%] sm:w-[80%] md:w-[55%] mx-auto mb-8">
        Stay informed with the most up-to-date visa information, including
        requirements, fees, and application details.
      </p>

      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {visas.map((visa) => (
          <VisaCard key={visa._id} visa={visa} />
        ))}
      </div>
      <div className="text-center mt-8">
        <button
          onClick={() => navigate("/all-visas")}
          className="px-4 py-2 rounded-lg font-semibold btn bg-primary/[130] text-white"
        >
          See All Visas
        </button>
      </div>
    </section>
  );
};

export default LatestVisas;
