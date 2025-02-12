import React, { useEffect, useState } from "react";
import { EmiOptions } from "./EmiOptions";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const  PriceCard = ({ Items,noByuAllbtn }) => {
  const location = useLocation()
  const currentLocation = location.pathname
  console.log(currentLocation,'currentlocation')

  const userId = useSelector(state=>state.user)._id
  console.log(Items,'recived from props')

  const [priceDetails, setPriceDetails] = useState({
    totalMrp: 0,
    totalSpecialPrice: 0,
    discount: 0,
    platformCharge: Items?.length > 0 ? 3 : 0,
    total: 0,
  });

  const getPriceDetails = (items) => {
    try {
      const stockedItems = items?.filter(item => item.isStock);
      const newTotalMrp = stockedItems.reduce((sum, item) => sum + Number(item.price), 0);
      const newTotalSpecialPrice = stockedItems.reduce((sum, item) => sum + Number(item.specialPrice), 0);
      const newDiscount = newTotalMrp - newTotalSpecialPrice;
      const newPlatformCharge = stockedItems.length > 0 ? 3 : 0;
      const newTotal = newTotalSpecialPrice + newPlatformCharge;
  
      setPriceDetails({
        totalMrp: newTotalMrp,
        totalSpecialPrice: newTotalSpecialPrice,
        discount: newDiscount,
        platformCharge: newPlatformCharge,  // Now updates dynamically
        total: newTotal,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
    
  
  useEffect(() => {
    if (Items.length > 0) {
      getPriceDetails(Items);
    } else {
      getPriceDetails([]); 
    }
  }, [Items]);
  

  const { totalMrp, discount, platformCharge, total } = priceDetails;
  const stockedItemsCount = Items?.filter(item => item.isStock)?.length || 0;

  return (
    <>
      <div className="w-full flex flex-col gap-2 sm:gap-5">
      <div className="max-w-sm w-full mx-auto p-2 sm:p-4 border rounded-md shadow-lg bg-white">
        <h2 className="text-xs sm:text-lg font-semibold mb-4">PRICE DETAILS</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-[10px] sm:text-lg">Price {stockedItemsCount} Item{stockedItemsCount > 1 ? 's' : ''}</span>
            <span className="text-[10px] sm:text-lg">₹{totalMrp}</span>
          </div>
          <div className="flex justify-between text-green-600 text-[10px] sm:text-lg">
            <span>Discount</span>
            <span>− ₹{discount}</span>
          </div>
          <div className="flex justify-between text-[10px] sm:text-lg">
            <span>Platform Fee</span>
            <span>₹{platformCharge}</span>
          </div>
          <div className="flex justify-between text-[10px] sm:text-lg">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex justify-between font-semibold text-xs sm:text-lg">
          <span>Total Amount</span>
          <span>₹{total}</span>
        </div>
        <p className="text-sm text-green-600 mt-2 text-xs sm:text-sm">
          You will save ₹{discount} on this order
        </p>
      </div>

      <div className="hidden sm:block max-w-sm mx-auto ">
        <EmiOptions/>
      </div>
      <div className="text-gray-500 mt-5 sm:p-3  font-semibold text-xs sm:text-sm">
        Safe and Secure Payments. Easy returns. 100% Authentic products.
      </div>
      {!noByuAllbtn  && Items.length > 0 && currentLocation.includes('cart')&&
      <Link className="w-full bg-orange-500 text-white text-center sm:py-2 hover:bg-orange-400"
      to={`/outlet/${userId}/buynow`} 
    >
      Buy all
    </Link>
      }
      </div>
    </>
  );
};
