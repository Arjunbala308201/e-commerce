import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

export const AddAddress = ({ close, fetchAddress }) => {
  const userId = useSelector((state) => state.user)._id;

  const [formData, setFormData] = useState({
    name: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    addressType: "Home",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: `+${value}`,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const addAddress = async (addressData) => {
    try {
      const response = await axios.post(
        `http://localhost:4001/address/add/${userId}`,
        addressData
      );
      toast.success(response.data.message);
      fetchAddress(userId);
    } catch (error) {
      toast.error(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="bg-white sm:p-4 sm:p-6 w-full max-w-3xl mx-auto rounded-md shadow-md">
      <h2 className="text-xs sm:text-sm md:text-lg font-semibold mb-2 sm:mb-4">
        Add a New Address
      </h2>

      <button className="w-full bg-blue-600 text-white py-1 sm:py-2 rounded-md flex items-center justify-center gap-2 mb-3 sm:mb-4 text-xs sm:text-sm">
        📍 Use my current location
      </button>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 bg-white p-3 sm:p-6 shadow-md rounded-md overflow-hidden"
      >
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        />

        {/* Phone Number */}
        <PhoneInput
          country={"in"}
          value={formData.mobile}
          onChange={(value) => handlePhoneChange(value, "mobile")}
          inputClass="w-full p-1 sm:p-2 border-2 rounded-md text-xs sm:text-sm"
          containerClass="w-full border-0"
          buttonClass="!w-10 !h-10 sm:!w-12 sm:!h-12 border-2"
        />

        {/* Pincode & Locality */}
        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={formData.locality}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        />

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address (Area and Street)"
          value={formData.address}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md col-span-1 sm:col-span-2 h-16 sm:h-20 resize-none text-xs sm:text-sm"
          required
        />

        {/* City & State */}
        <input
          type="text"
          name="city"
          placeholder="City/District/Town"
          value={formData.city}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        />
        <select
          name="state"
          value={formData.state}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        >
          <option value="">--Select State--</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
        </select>

        {/* Landmark & Alternate Phone */}
        <input
          type="text"
          name="landmark"
          placeholder="Landmark"
          value={formData.landmark}
          onChange={handleChange}
          className="border p-1 sm:p-2 rounded-md text-xs sm:text-sm"
          required
        />

        <PhoneInput
          country={"in"}
          value={formData.alternatePhone}
          onChange={(value) => handlePhoneChange(value, "alternatePhone")}
          inputClass=" p-1 sm:p-2 border-2 rounded-md text-xs sm:text-sm"
          containerClass=" border-0"
          buttonClass="!w-10 !h-10 sm:!w-12 sm:!h-12 border-2"
        />

        {/* Address Type */}
        <div className="col-span-1 sm:col-span-2 flex flex-wrap gap-2 sm:gap-4 mt-2 text-xs sm:text-sm">
          <label className="flex items-center gap-1 sm:gap-2">
            <input
              type="radio"
              name="addressType"
              value="Home"
              checked={formData.addressType === "Home"}
              onChange={handleChange}
            />
            Home (All day delivery)
          </label>
          <label className="flex items-center gap-1 sm:gap-2">
            <input
              type="radio"
              name="addressType"
              value="Work"
              checked={formData.addressType === "Work"}
              onChange={handleChange}
            />
            Work (Delivery between 10 AM - 5 PM)
          </label>
        </div>

        {/* Buttons */}
        <div className="col-span-1 sm:col-span-2 flex flex-col sm:flex-row gap-2 sm:justify-between mt-4">
          <button
            type="submit"
            className="bg-orange-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-md text-xs sm:text-sm w-full sm:w-auto"
            onClick={() => addAddress(formData)}
          >
            Save and Deliver Here
          </button>
          <button
            type="button"
            onClick={close}
            className="text-blue-600 text-xs sm:text-sm w-full sm:w-auto"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
