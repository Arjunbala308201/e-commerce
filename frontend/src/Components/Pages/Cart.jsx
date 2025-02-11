import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { PriceCard } from "../Subcomponents/PriceCard";
import axios from "axios";
import { useSelector } from "react-redux";

export const Cart = ({isLogin}) => {
    const user = useSelector(state=>state.user)
    const userId = user._id

    const location = useLocation()
    const currentLocation = location.pathname
    const [cartProducts,setCartProduct] = useState([])
    const [cartItems, setCartItems] = useState([]);

    const getCartProducts = async()=>{
      try {
        const response = await axios.get(`http://localhost:4001/cart/${userId}`)
        console.log(response.data,'response frm api')
        setCartProduct(response.data)
      } catch (error) {
        console.log(error.message)
        console.log('error')
      }
    }
    console.log(cartProducts,'cartProducts')
    console.log(isLogin,'isLogin')
  useEffect(()=>{
    getCartProducts()
  },[])
  useEffect(() => {
    if (cartProducts && cartProducts.length > 0) {
        const extractedCart = cartProducts.map(item => item.product);
        setCartItems(extractedCart);
    } else {
        setCartItems([]);
    }
}, [cartProducts]);
    console.log(cartItems, 'Extracted Cart Items');
    console.log(cartProducts,'cartptrofucr')
  return (
    <div className="flex flex-col min-h-screen h-full bg-gray-100 gap-3 container mx-auto ">
        {/* navigation */}
        <div className="w-full flex gap-5">
          <div className={`${isLogin ?('w-[70%]'):('w-full')}`}>
            <div className="flex bg-white gap-10 h-16 ">
                <div className="flex w-1/2 h-full justify-center items-center">
                    <Link to='/outlet/cart/flipkart' className={`hover:text-blue-600 w-1/2 h-full flex justify-center items-center border-b-2 border-b-transparent
                       ${currentLocation==='/outlet/cart/flipkart'?('!border-b-blue-600 text-blue-600 font-semibold'):('')}`}>Flipkart</Link>
                </div>
                <div className="flex w-1/2 h-full justify-center items-center ">
                    <Link to='/outlet/cart/groceries' className={`hover:text-blue-600 w-1/2 h-full flex justify-center items-center border-b-2 border-b-transparent  
                      ${currentLocation==='/outlet/cart/groceries'?('!border-b-blue-600 text-blue-600  font-semibold'):('')}`}>Groceries</Link>
                </div>
            </div>
            {/* Outlet */}
            <div className="mt-2">
              <Outlet context={{cartItems,getCartProducts}} />
            </div>
          </div>
          {isLogin &&
          <div className="flex flex-col w-[30%]">
            <PriceCard Items={cartItems} />
          </div>}
        </div>
      {/* Footer */}
      <footer className=" py-6 text-gray-600 text-sm">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            <div className="flex">
              <span className="mr-2">Policies:</span>
              <div className="text-blue-600 hover:underline">
                Returns Policy
              </div>
              <span className="mx-2">|</span>
              <div className="text-blue-600 hover:underline">
                Terms of use
              </div>
              <span className="mx-2">|</span>
              <div className="text-blue-600 hover:underline">
                Security
              </div>
              <span className="mx-2">|</span>
              <div className="text-blue-600 hover:underline">
                Privacy
              </div>
            </div>
            <div>© 2007-2025 Flipkart.com</div>
          </div>
          <div className="mt-4 text-center">
            Need help? Visit the{" "}
            <div className="text-blue-600 hover:underline">
              Help Center
            </div>{" "}
            or{" "}
            <div className="text-blue-600 hover:underline">
              Contact Us
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
