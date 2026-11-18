import React, { useState } from "react";
import { Truck } from "lucide-react";

const ShippingForm = ({ onNext, onShippingChange }) => {
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setShipping((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onShippingChange(shipping);
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-none">
      {/* Heading */}
      <h2 className="mb-7 flex items-center gap-4 text-base font-normal text-[#222]">
        <Truck size={27} strokeWidth={1.5} />
        Shipping Information
      </h2>

      {/* First Name and Last Name */}
      <div className="mb-4 grid grid-cols-2 gap-[10px]">
        <input
          name="firstName"
          value={shipping.firstName}
          onChange={handleChange}
          type="text"
          placeholder="First Name"
          required
          className="h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
        />

        <input
          name="lastName"
          value={shipping.lastName}
          onChange={handleChange}
          type="text"
          placeholder="Last Name"
          required
          className="h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
        />
      </div>

      {/* Email */}
      <input
        name="email"
        value={shipping.email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
        required
        className="mb-4 h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
      />

      {/* City, Postal Code and Country */}
      <div className="mb-4 grid grid-cols-3 gap-[10px]">
        <input
          name="city"
          value={shipping.city}
          onChange={handleChange}
          type="text"
          placeholder="City"
          required
          className="h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
        />

        <input
          name="postalCode"
          value={shipping.postalCode}
          onChange={handleChange}
          type="text"
          placeholder="Postal Code"
          required
          className="h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
        />

        <select
          name="country"
          value={shipping.country}
          onChange={handleChange}
          required
          className="h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm text-gray-600 outline-none"
        >
          <option value="">Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      {/* Phone */}
      <input
        name="phone"
        value={shipping.phone}
        onChange={handleChange}
        type="tel"
        placeholder="Phone Number"
        required
        className="mb-8 h-[43px] w-full bg-[#E5E5E5] px-[22px] text-sm outline-none"
      />

      {/* Continue Button */}
      <button
        type="submit"
        className="h-[35px] w-full bg-[#FFC400] text-sm font-medium text-black transition hover:bg-yellow-500"
      >
        CONTINUE TO PAYMENT
      </button>
    </form>
  );
};

export default ShippingForm;
