import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { PriceCard } from "../Subcomponents/PriceCard";
import { useSelector } from "react-redux";

export const Wishlist = ({ isLogin }) => {
  const user = useSelector((state) => state.user);
  const userId = user?._id; // Fix: Prevent error if user is null

  const [wishlist, setWishlist] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const location = useLocation();
  const currentLocation = location.pathname;
  const [isWishlist, setIsWishlist] = useState(false); // Fix: Boolean value

  const fetchWishlist = async () => {
    try {
      if (!userId) return; // Fix: Avoid API call if userId is undefined

      const wishlistProducts = await axios.get(
        `http://localhost:4001/wishlist/${userId}`
      );
      const products = wishlistProducts.data;
      console.log(products, "response from API");
      setWishlist(products);
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
    }
  };

  useEffect(() => {
    fetchWishlist();
    setIsWishlist(
      currentLocation === "/outlet/wishlist/flipkart" ||
        currentLocation === "/outlet/wishlist/groceries"
    ); // Fix: Boolean check
  }, [currentLocation, userId]); // Fix: Add dependencies

  useEffect(() => {
    if (wishlist.length > 0) {
      const extractedWishlist = wishlist.map((item) => item.product);
      setWishlistItems(extractedWishlist);
      console.log(wishlistItems,'extreacted items')
    } else {
      setWishlistItems([]);
    }
  }, [wishlist]);

  return (
    <>
      <div className="w-full flex gap-1 sm:gap-5 min-h-screen">
        <div className={`${isWishlist ? "w-[65%]" : "w-full"}`}>
          <div className="flex bg-white gap-10 h-10 sm:h-16">
            <div className="flex w-1/2 h-full justify-center items-center">
              <Link
                to="/outlet/wishlist/flipkart"
                className={`hover:text-blue-600 w-1/2 h-full flex justify-center items-center border-b-2 border-b-transparent
                            ${
                              currentLocation === "/outlet/wishlist/flipkart"
                                ? "!border-b-blue-500 text-blue-600 font-semibold"
                                : ""
                            }`}
              >
                Flipkart
              </Link>
            </div>
            <div className="flex w-1/2 h-full justify-center items-center">
              <Link
                to="/outlet/wishlist/groceries"
                className={`hover:text-blue-600 w-1/2 h-full flex justify-center items-center border-b-2 border-b-transparent  
                            ${
                              currentLocation === "/outlet/wishlist/groceries"
                                ? "!border-b-blue-500 text-blue-600  font-semibold"
                                : ""
                            }`}
              >
                Groceries
              </Link>
            </div>
          </div>
          {/* Outlet */}
          <div className="mt-2 flex flex-col gap-2">
            <Outlet context={{ wishlistItems, fetchWishlist }} />
          </div>
        </div>
        {isWishlist && (
          <div className="flex flex-col w-[35%]">
            {console.log(isLogin)}
            {isLogin ? (
              <PriceCard Items={wishlistItems.length > 0 ? wishlistItems : []} />
            ) : (
              <PriceCard />
            )}
          </div>
        )}
      </div>
    </>
  );
};
