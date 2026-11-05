import React, { useState } from "react";

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
    <form onSubmit={handleSubmit} className="w-full">
      <h2 className="mb-3 text-[9px] font-medium">
        🚚 &nbsp; Shipping Information
      </h2>

      <div className="mb-1 grid grid-cols-2 gap-1">
        <input
          name="firstName"
          value={shipping.firstName}
          onChange={handleChange}
          type="text"
          placeholder="First Name"
          required
          className="h-5 bg-gray-200 px-2 text-[7px] outline-none"
        />

        <input
          name="lastName"
          value={shipping.lastName}
          onChange={handleChange}
          type="text"
          placeholder="Last Name"
          required
          className="h-5 bg-gray-200 px-2 text-[7px] outline-none"
        />
      </div>

      <input
        name="email"
        value={shipping.email}
        onChange={handleChange}
        type="email"
        placeholder="Email Address"
        required
        className="mb-1 h-5 w-full bg-gray-200 px-2 text-[7px] outline-none"
      />

      <div className="mb-1 grid grid-cols-[1.1fr_0.9fr_0.9fr] gap-1">
        <input
          name="city"
          value={shipping.city}
          onChange={handleChange}
          type="text"
          placeholder="City"
          required
          className="h-5 bg-gray-200 px-2 text-[7px] outline-none"
        />

        <input
          name="postalCode"
          value={shipping.postalCode}
          onChange={handleChange}
          type="text"
          placeholder="Postal Code"
          required
          className="h-5 bg-gray-200 px-2 text-[7px] outline-none"
        />

        <select
          name="country"
          value={shipping.country}
          onChange={handleChange}
          required
          className="h-5 bg-gray-200 px-2 text-[7px] text-gray-500 outline-none"
        >
          <option value="">Country</option>
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </div>

      <input
        name="phone"
        value={shipping.phone}
        onChange={handleChange}
        type="tel"
        placeholder="Phone Number"
        required
        className="mb-3 h-5 w-full bg-gray-200 px-2 text-[7px] outline-none"
      />

      <button
        type="submit"
        className="h-5 w-full bg-yellow-400 text-[7px] font-medium hover:bg-yellow-500"
      >
        CONTINUE TO PAYMENT
      </button>
    </form>
  );
};

export default ShippingForm;
