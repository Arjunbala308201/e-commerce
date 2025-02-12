import axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";

const ProductCard = ({ productList, category}) => {
  const user = useSelector(state=>state.user)
  const userId = user._id

  const addTowishList = async (id) => {
    try {
      console.log(id,'form function')
      const response = await axios.post(`http://localhost:4001/wishlist/add/${userId}`,{productId:id});
      console.log(response.data); 
      if(response.data.toast==='warning'){
        toast.warning(response.data.message)
      }
      if(response.data.toast ==='success'){
        toast.success(response.data.message)
      }
    } catch (error) {
      console.error("Error adding product:", error.message);
      console.log(error)
    } 
  };

const handleHeart = (item)=>{
  if(userId){
    addTowishList(item)
  }
  if(!userId){
    toast.warning('Please Login')
  }
}
  return (
    <>
      {productList.map((item, index) => (
        <div className="relative h-auto bg-white">
        <Link
          key={index}
          className="block max-w-xs p-4 border rounded-md shadow-lg z-10 hover:shadow-xl transition-shadow "
          to={`/outlet/${category}/${item._id}`}
        >
          {/* Product Image */}
          <div className="relative w-full h-48  rounded-lg">
            <img
              src={item.image}
              alt={`${item.brand} ${item.name}`}
              className="w-full h-full object-contain rounded-sm"
            />
          </div>

          {/* Product Details */}
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-800">
              {item.brand} {item.name} {item.model}
            </h3>
            <div className="flex items-center text-sm">
              <div className="flex items-center text-yellow-500">
                <IoStar/>
                <span className="ml-1">{item.ratings}</span>
              </div>
              <span className="ml-2 text-gray-500">{item.review}</span>
            </div>
              <div className="mt-3">
                <div className="text-lg font-bold text-gray-800">₹{item.specialPrice}</div>
                <div className="flex items-center text-sm text-gray-500 line-through">₹{item.price}</div>
                <div className="text-sm text-green-600">{item.discount}</div>
              </div>
            </div>
          </Link>
                    <button
                    className="absolute top-4 right-4 z-40 p-1 bg-white rounded-full shadow-sm hover:shadow-md group"
                    onClick={(event) => handleHeart(item._id)} // Pass event to prevent navigation
                  >
                    <span className="text-gray-300 group-hover:text-red-500">
                      <FaHeart className="" />
                    </span>
                  </button>
                  </div>
      ))}
    </>
  );
};

export default ProductCard;
