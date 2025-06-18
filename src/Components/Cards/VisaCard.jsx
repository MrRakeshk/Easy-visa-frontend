import { Link } from "react-router-dom";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { FaClipboardList, FaMapMarkerAlt, FaExclamationTriangle } from "react-icons/fa";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Contexts/AuthContext/AuthProvider";
import "aos/dist/aos.css";
import Aos from "aos";

const VisaCard = ({ visa }) => {
  const {
    countryImage,
    countryName,
    visaType,
    fee,
    validity,
    processingTime,
    applicationMethod,
    touristPlaces,
    dangerousPlaces,
  } = visa;

  const { theme } = useContext(AuthContext);

  useEffect(() => {
    Aos.init({ duration: 500 });
  }, []);

  return (
    <div
      className={`card shadow-lg rounded-lg border border-gray-200 ${
        theme === "dark" ? "text-white bg-gray-950" : "text-black bg-white"
      } p-2`}
    >
      <img
        data-aos="fade-up"
        src={countryImage}
        alt={`${countryName} Visa`}
        className="rounded-t-lg object-cover h-3/4"
      />
      <div data-aos="slide-up" className="p-4 flex flex-col">
        <h2 className="text-xl font-semibold text-primary mb-2">{countryName}</h2>
        <div className="flex-grow mt-3">
          <p className="flex items-center gap-2">
            <FiType className="text-green-500 text-xl" />
            <strong>Visa Type:</strong> {visaType}
          </p>
          <p className="flex items-center gap-2">
            <BiTimeFive className="text-blue-500 text-xl" />
            <strong>Processing Time:</strong> {processingTime}
          </p>
          <p className="flex items-center gap-2">
            <RiMoneyDollarCircleLine className="text-green-600 text-xl" />
            <strong>Fee:</strong> ${fee}
          </p>
          <p className="flex items-center gap-2">
            <BsCalendarCheck className="text-purple-500 text-xl" />
            <strong>Validity:</strong> {validity}
          </p>
          <p className="flex items-center gap-2">
            <FaClipboardList className="text-teal-500 text-xl" />
            <strong>Application Method:</strong> {applicationMethod}
          </p>
          {touristPlaces && (
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-blue-400 text-xl" />
              <strong>Tourist Places:</strong> {touristPlaces}
            </p>
          )}
          {dangerousPlaces && (
            <p className="flex items-center gap-2">
              <FaExclamationTriangle className="text-red-500 text-xl" />
              <strong>Dangerous Places:</strong> {dangerousPlaces}
            </p>
          )}
        </div>
        <div className="mt-3">
          <Link
            to={`/visa-details/${visa._id}`}
            className="px-4 py-2 block text-center text-lg rounded-lg bg-primary/90 w-full text-white font-semibold"
          >
            See Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VisaCard;
