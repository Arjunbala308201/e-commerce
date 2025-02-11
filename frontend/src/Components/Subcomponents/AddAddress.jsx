import { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
export const AddAddress = ({ close,fetchAddress }) => {
  const userId = useSelector(state=>state.user)._id
  console.log(userId)
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
    console.log(formData.alternatePhone)

  };

const handlePhoneChange = (value, name) => {
  setFormData((prev) => ({
    ...prev,
    [name]: `+${value}`  // Add the "+" sign before the phone number
  }));
};

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Address Data:", formData); // Now it will include mobile number
  };
  
  const addAddress = async (addressData) => {
    try {
      console.log(userId,'userid')
      const response = await axios.post(`http://localhost:4001/address/add/${userId}`, addressData);
      console.log('Address added successfully:', response.data);
      toast.success(response.data.message)
      fetchAddress(userId)
    } catch (error) {
      console.error('Error adding address:', error.response ? error.response.data : error.message);
      toast.error(error.response ? error.response.data : error.message)
    }
  };
  return (
    <div className="bg-white p-6 w-full max-w-3xl mx-auto">
      <h2 className="text-lg font-semibold mb-4">Add a New Address</h2>

      <button className="w-full bg-blue-600 text-white py-2 rounded-md flex items-center justify-center gap-2 mb-4">
        📍 Use my current location
      </button>

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 bg-white p-6 shadow-md rounded-md">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded-md"
          required
        />

        {/* Phone Number */}
        <PhoneInput
        country={"in"}
        value={formData.mobile} // Bind phone input to formData.mobile
        onChange={(value) => handlePhoneChange(value, "mobile")} // Update formData.mobile
        inputClass="w-full p-2 border-2 rounded-md"
        containerClass="w-full border-0"
        buttonClass="!w-12 !h-12 border-2"
      />

        {/* Pincode & Locality */}
        <input type="text" name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} className="border p-2 rounded-md" required />
        <input type="text" name="locality" placeholder="Locality" value={formData.locality} onChange={handleChange} className="border p-2 rounded-md" required />

        {/* Address */}
        <textarea name="address" placeholder="Address (Area and Street)" value={formData.address} onChange={handleChange} className="border p-2 rounded-md col-span-2 h-20 resize-none" required />

        {/* City & State */}
        <input type="text" name="city" placeholder="City/District/Town" value={formData.city} onChange={handleChange} className="border p-2 rounded-md" required />
        <select name="state" value={formData.state} onChange={handleChange} className="border p-2 rounded-md" required>
          <option value="">--Select State--</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Kerala">Kerala</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Delhi">Delhi</option>
        </select>

        {/* Landmark & Alternate Phone */}
        <input type="text" name="landmark" placeholder="landmark" value={formData.landmark} onChange={handleChange} className="border p-2 rounded-md" required />

        <PhoneInput
        country={"in"}
        value={formData.alternatePhone} // Bind phone input to formData.alternatePhone
        onChange={(value) => handlePhoneChange(value, "alternatePhone")} // Update formData.alternatePhone
        inputClass="w-full p-2 border-2 rounded-md"
        containerClass="w-full border-0"
        buttonClass="!w-12 !h-12 border-2"
      />
        {/* Address Type */}
        <div className="col-span-2 flex items-center gap-4 mt-2">
          <label className="flex items-center gap-2">
            <input type="radio" name="addressType" value="Home" checked={formData.addressType === "Home"} onChange={handleChange} />
            Home (All day delivery)
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="addressType" value="Work" checked={formData.addressType === "Work"} onChange={handleChange} />
            Work (Delivery between 10 AM - 5 PM)
          </label>
        </div>

        {/* Buttons */}
        <div className="col-span-2 flex justify-between mt-4">
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded-md"
          onClick={()=>addAddress(formData)}>
            Save and Deliver Here
          </button>
          <button type="button" onClick={close} className="text-blue-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
