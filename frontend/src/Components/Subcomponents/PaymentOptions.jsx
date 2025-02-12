import axios from "axios";
import { useState } from "react";
import { FaClock } from "react-icons/fa";
import { FaMoneyBill, FaExchangeAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaGift } from "react-icons/fa";

export const PaymentOptions = ({ product }) => {

  const navigation = useNavigate();
  const userId = useSelector((state) => state.user)._id;
  const [selectedOption, setSelectedOption] = useState(null);
  const [timer, setTimer] = useState(5 * 60); // 5 minutes countdown

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")} : ${secs.toString().padStart(2, "0")}`;
  };

  const paymentMethods = [
    { id: 1, name: "UPI", description: "Pay by any UPI app", icon: <FaExchangeAlt /> },
    { id: 6, name: "Cash on Delivery", description: "Pay when you receive the item", icon: <FaMoneyBill /> },
  ];
  const placeOrder = async()=>{
    try {
      if(selectedOption){
        const orders = product.map(item => ({ product: item._id, userId: userId }));
        const response = await axios.post(`https://e-commerce-noec.onrender.com/orders/add`,{orders:orders})
        console.log(response.data.message)
        if(response.data.toast==='success'){
          toast.success(response.data.message)
          navigation('/')
        }
      }
      else{
        toast.warning('please select a payment type')
      }

    } catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className="mx-auto bg-white rounded-md">
      {/* Timer */}Timer
      <div className="bg-yellow-100 p-1 sm:p-3 text-sm text-gray-800 flex items-center justify-between">
        <span>Complete payment in</span>
        <div className="flex items-center gap-2">
          <FaClock className="text-red-500" />
          <span className="text-xs sm:text-sm font-bold">{formatTime(timer)}</span>
        </div>
      </div>

      <div className="bg-gray-50 p-2 md:p-4">
        {paymentMethods.map((method) => (
          <label key={method.id} className="flex items-center justify-between p-1 sm:p-3 border-b cursor-pointer hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <div className="text-purple-600 text-xl">{method.icon}</div>
              <div>
                <span className="font-medium text-xs sm:text-sm">{method.name}</span>
                <p className="text-sm text-gray-600 text-[8px] sm:text-sm">{method.description}</p>
              </div>
            </div>
            <input
              type="radio"
              name="payment"
              className="accent-blue-600"
              checked={selectedOption === method.id}
              onChange={() => setSelectedOption(method.id)}
            />
          </label>
        ))}
      </div>

      {/* Add Gift Card */}
      <div className="sm:p-3 p-1 text-blue-600 font-semibold border-t cursor-pointer hover:bg-gray-100 flex items-center gap-2">
        <FaGift />
        <span className="sm:text-sm text-xs">Add Gift Card</span>
      </div>

      {/* Continue Button */}
      <div className="md:px-20 px-10 flex justify-center">
        <button
          className="w-full bg-orange-500 px-2 text-white font-semibold py-2 text-xs sm:text-sm rounded-md hover:bg-orange-600"
          onClick={placeOrder}
        >
          {selectedOption ? ('PLACE ORDER') : ('CONTINUE')}
        </button>
      </div>
    </div>
  );
  }
