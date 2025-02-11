import React, { useState } from 'react';

const QuantityInput = ({updateQuantity}) => {
  // Initialize quantity state as an array to handle multiple inputs
  const [quantities, setQuantities] = useState([0]);

  const increment = (index) => {
    const newQuantities = [...quantities]; // Clone the current state
    newQuantities[index] += 1; // Increment the quantity at the given index
    setQuantities(newQuantities); // Update state with new quantities
  };

  const decrement = (index) => {
    const newQuantities = [...quantities];
    if (newQuantities[index] > 0) {
      newQuantities[index] -= 1; // Decrement if the value is greater than 0
    }
    setQuantities(newQuantities); // Update state with new quantities
  };

  return (
    <div className="container mx-auto mt-5 pb-5">
      <div className="flex justify-center space-x-3">
        {/* Render quantity inputs dynamically */}
        {quantities.map((quantity, index) => (
          <div key={index} className="w-1/3">
            <div className="flex items-center justify-center space-x-1">
              <button
                className="border border-gray-300 p-2 text-sm h-9 w-9 rounded-lg hover:bg-gray-100 transition duration-300"
                onClick={() => decrement(index)}
              >
                <i className="fa fa-chevron-left"></i>
              </button>
              <input
                type="text"
                value={quantity}
                onChange={updateQuantity}
                readOnly
                className="text-center p-2 border border-gray-300 rounded-lg max-w-[80px]"
              />
              <button
                className="border border-gray-300 p-2 text-sm h-9 w-9 rounded-lg hover:bg-gray-100 transition duration-300"
                onClick={() => increment(index)}
              >
                <i className="fa fa-chevron-right"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuantityInput;
