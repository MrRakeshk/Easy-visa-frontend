import { useState, useContext, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../../Contexts/AuthContext/AuthProvider";
import { FiType } from "react-icons/fi";
import { BiTimeFive } from "react-icons/bi";
import { AiOutlineFileText } from "react-icons/ai";
import { MdDescription } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { BsCalendarCheck } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";
import "aos/dist/aos.css";
import Aos from "aos";

const VisaDetails = () => {
  const visaData = useLoaderData();
  const { user, Toast, theme } = useContext(AuthContext);
  const [visa, setVisa] = useState(visaData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    appliedDate: new Date().toISOString().split("T")[0],
    fee: visaData.fee || "",
  });
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({ duration: 500 });
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = async (e) => {
    e.preventDefault();
    const { _id, ...visaWithoutId } = visa;
    const applicationData = {
      ...formData,
      visaId: _id,
      ...visaWithoutId,
    };
    fetch("https://visaease.vercel.app/Applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(applicationData),
    })
      .then((res) => {
        if (res.ok) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Application submitted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsModalOpen(false);
        } else {
          if (res.status === 400) {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Application already exists",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            Swal.fire({
              position: "center",
              icon: "error",
              title: "Failed to submit application",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }
      })
      .catch((error) => {
        Toast(error.message, "error");
      });
  };

  return (
    <div
      className={`container mx-auto max-w-3xl px-4 py-8 ${
        theme == "dark" ? "text-white" : "text-black"
      }`}
    >
      <Helmet>
        <title>VisaEase | Visa-Details | {visa._id}</title>
      </Helmet>
      <h1
        data-aos="zoom-in"
        className="text-3xl text-center font-bold mb-6 text-primary"
      >
        {visa.countryName} Visa Details
      </h1>
      <div
        className={`shadow ${
          theme == "dark" ? "bg-gray-950" : "bg-white"
        } rounded-lg p-6`}
      >
        <img
          data-aos="zoom-in"
          src={visa.countryImage}
          alt={`${visa.countryName}`}
          className="rounded-lg w-[60%] mx-auto object-cover mb-4 border-2 border-gray-100"
        />
        <div className="max-w-2xl mx-auto w-fit space-y-2">
          <p
            data-aos="fade-right"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <FiType className="text-green-500 text-xl" />
            <strong>Visa Type:</strong> {visa.visaType}
          </p>
          <p
            data-aos="fade-left"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <BiTimeFive className="text-blue-500 text-xl" />
            <strong>Processing Time:</strong> {visa.processingTime}
          </p>
          <p
            data-aos="fade-right"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <AiOutlineFileText className="text-indigo-500 text-xl" />
            <strong>Required Documents:</strong>{" "}
            {visa.requiredDocuments.join(", ")}
          </p>
          <p
            data-aos="fade-left"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <MdDescription className="text-yellow-500 text-xl" />
            <strong>Description:</strong> {visa.description}
          </p>
          <p
            data-aos="fade-right"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <FaBirthdayCake className="text-pink-500 text-xl" />
            <strong>Age Restriction:</strong> {visa.ageRestriction} years
          </p>
          <p
            data-aos="fade-left"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <RiMoneyDollarCircleLine className="text-green-600 text-xl" />
            <strong>Fee:</strong> ${visa.fee}
          </p>
          <p
            data-aos="fade-right"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <BsCalendarCheck className="text-purple-500 text-xl" />
            <strong>Validity:</strong> {visa.validity}
          </p>
          <p
            data-aos="fade-left"
            className={`flex items-center gap-4 ${
              theme == "dark" ? "text-white" : "text-gray-700"
            }`}
          >
            <HiOutlineMail className="text-teal-500 text-xl" />
            <strong>Application Method:</strong> {visa.applicationMethod}
          </p>
        </div>
        <button
          data-aos="fade-right"
          onClick={() => setIsModalOpen(true)}
          className="flex mx-auto px-4 py-2 bg-primary text-white rounded-md mt-8 hover:bg-primary-dark transition"
        >
          Apply for the Visa
        </button>
      </div>

      {isModalOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center ${
            theme == "dark" ? "text-white" : "text-black"
          } z-50`}
        >
          <div className="modal-box w-full max-w-lg  rounded-lg shadow-lg p-6">
            <h2
              data-aos="zoom-in"
              className="text-2xl font-bold text-primary mb-4"
            >
              Apply for {visa.countryName} Visa
            </h2>
            <form onSubmit={handleApply}>
              <div data-aos="fade-left" className="mb-4">
                <label className="block font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div data-aos="fade-right" className="mb-4">
                <label className="block font-medium">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div data-aos="fade-left" className="mb-4">
                <label className="block font-medium">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div data-aos="fade-right" className="mb-4">
                <label className="block font-medium">Applied Date</label>
                <input
                  type="date"
                  name="appliedDate"
                  value={formData.appliedDate}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div data-aos="fade-left" className="mb-4">
                <label className="block font-medium">Fee</label>
                <input
                  type="number"
                  name="fee"
                  value={formData.fee}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>
              <div
                data-aos="fade-right"
                className="modal-action flex justify-end"
              >
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-1 rounded-lg bg-red-600 text-white text-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1 rounded-lg bg-green-600 text-white text-lg font-semibold"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisaDetails;
