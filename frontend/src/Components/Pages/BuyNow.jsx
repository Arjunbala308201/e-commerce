import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa6";
import { OrderPreview } from "../Subcomponents/OrderPreview";
import { PriceCard } from '../Subcomponents/PriceCard';
import { PaymentOptions } from '../Subcomponents/PaymentOptions';
import { AddressSection } from "../Subcomponents/AddressSection";

export const BuyNow = () => {
  const { productId, userId } = useParams();
  console.log(productId,'productId')
  console.log(userId,'uerId')
  const navigate = useNavigate();

  const [product, setProduct] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  console.log("Params - Product ID:", productId, "User ID:", userId);

  const fetchProductsById = async () => {
    try {
      const response = await axios.get(`https://e-commerce-noec.onrender.com/products?search=${productId}`);
      console.log("Product response:", response.data);
      setProduct(response.data);
      console.log(response.data,'specific product from function')
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  console.log(product,'the specifivc product')

  const getCartProducts = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4001/cart/${id}`);
      console.log("Cart API Response:", response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error.message);
    }
  };

  useEffect(() => {
    getCartProducts(userId);
    if (productId) {fetchProductsById();}
  }, [userId, productId]); 

  useEffect(() => {
    console.log("Updated cart items:", cartItems); 
  }, [cartItems]);

  const extracted = cartItems.map(item =>item.product)
console.log(extracted,'extracted cartitems')
console.log(cartItems,'unextracted')
  return (
    <div className="flex w-full">
      <div className="p-2 sm:p-4 bg-white shadow-md rounded-md w-[65%]">
        {/* Step 1: Login */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 flex justify-between">
            <span>
             <div className="text-sm sm:text-lg flex">Login
              <input type="checkbox" checked={!!userId} disabled className="ml-2" />
              </div>
            </span>
            <button className="text-blue-600 hover:underline text-xs sm:text-lg">CHANGE</button>
          </h2>
        </div>

        <AddressSection />

        {/* Step 3: Order Summary */}
        <div
          className="border-t pt-4 cursor-pointer hover:bg-gray-100 flex justify-between"
          onClick={() => setIsOpenPreview(!isOpenPreview)}
        >
          <h2 className="text-xs sm:text-lg font-semibold text-gray-600">3 ORDER SUMMARY</h2>
          <FaChevronDown className={`transition-all transform ${isOpenPreview ? "rotate-180" : ""}`} />
        </div>

        {isOpenPreview && <OrderPreview Items={productId ? product : extracted}/>}

        {/* Step 4: Payments */}
        <div className="border-t pt-4 mt-2 hover:bg-gray-100" onClick={() => setOpenPayment(!openPayment)}>
          <div className="flex justify-between">
            <h2 className="text-xs sm:text-lg font-semibold text-gray-600">4 PAYMENTS</h2>
            <FaChevronDown className={`transition-all transform ${openPayment ? "rotate-180" : ""}`} />
          </div>
        </div>

        <div>{openPayment && <> <div className="text-xs sm:text-lg">Paymentoption</div>
          <PaymentOptions  product={productId ? product : extracted} />
        </> }</div>

        {/* Back Button */}
        <div className="w-full text-xs sm:text-sm px-10 sm:px-20 flex justify-center mt-4">
          <button
            className="w-full rounded-lg py-2 bg-red-500 font-semibold text-white rounded-md hover:bg-red-600"
            onClick={() => navigate(-1)}
          >
            BACK
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-5 w-[35%]">
        <PriceCard Items={productId ? product : extracted} noByuAllbtn={true} />
      </div>
    </div>
  );
};
