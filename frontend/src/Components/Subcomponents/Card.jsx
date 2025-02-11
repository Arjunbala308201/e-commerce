import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FaHeart, FaTrashCan } from 'react-icons/fa6';
import { FaCartPlus } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useLocation, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Card = ({ productList, fetchFunction, isLogin, noBuy,isDate }) => {
  console.log(productList,'recived from props')
  const user = useSelector((state) => state.user);
  const userId = user._id;

  const location = useLocation();
  const path = location.pathname;

  const [isWishList, setIsWishList] = useState(false);
  const [isCart, setIsCart] = useState(false);

  useEffect(() => {
    setIsWishList(path === '/outlet/wishlist/flipkart');
    setIsCart(path === '/outlet/cart/flipkart');
  }, [path]);

  const addProductTocart = async (id) => {
    try {
      const response = await axios.post(`http://localhost:4001/cart/add/${userId}`, { productId:id});
      toast.success(response.data.message);
      fetchFunction();
    } catch (error) {
      console.error('Error adding product:', error.message);
      toast.error('Failed to add to cart');
    }
  };

  const addProductTowishList = async (id) => {
    try {
      const response = await axios.post(`http://localhost:4001/wishlist/add/${userId}`, { productId:id});
      if (response.data.toast ==='warning') {
        toast.warning(response.data.message);
      } if(response.data.toast === 'success'){
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error('Error adding product:', error.message);
      toast.error('Failed to add to wishlist');
    }
  };

  const deleteFromcart = async (id) => {
    try {
      console.log(id,'need to dlt')
      const deletedProduct = await axios.delete(`http://localhost:4001/cart/delete/${userId}/${id}`);
      toast.success('Product Deleted');
      fetchFunction();
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete product');
    }
  };

  const deleteFromWishlist = async (id) => {
    try {
      const deletedProduct = await axios.delete(`http://localhost:4001/wishlist/delete/${userId}/${id}`);
      toast.success('Product Deleted');
      fetchFunction();
    } catch (error) {
      console.error(error.message);
      toast.error('Failed to delete product');
    }
  };

  const tooltipClass = "absolute left-1/2 w-[100px] h-[20px] top-12 -translate-x-1/2 mt-2 w-max bg-gray-300 text-white text-xs rounded-sm py-1 px-2 hidden group-hover:block transition-opacity z-10";

  return (
    <>
      {productList.length > 0 && productList.map((product, index) => (
        <div className="w-full p-2 h-60 h-fit bg-white rounded-md" key={product._id}>
          <div className="flex">
            {/* Product Image */}
            <Link to={`/outlet/${product.category}/${product._id}`} className="relative w-[30%] flex justify-center items-center group">
              <img src={product.image} alt={product.name} className="object-contain w-full h-full max-h-40 hover:scale-110 transition-transform duration-300" />
            </Link>

            {/* Product Content */}
            <div className="content flex flex-col w-[70%] p-4 h-full text-gray-700 font-medium">
              <div className="text-[20px]">{`${product.brand} ${product.name}`}</div>
              <p className="text-sm text-gray-500">{product.model}</p>
              {product.isStock ? (
                <div className="text-[25px]">
                  <span className="text-sm text-gray-400"> ₹<del>{product.price}</del></span> <span className="font-semibold text-xl"> ₹ {product.specialPrice}</span>
                </div>
              ) : (
                <div className="text-[25px] font-semibold text-[#ff6161]">Out of Stock</div>
              )}

              {/* Buttons */}
              {isLogin && (
                <div className="w-full flex gap-4 items-center text-white mt-2">
                  {/* Wishlist Button */}
                  <button
                    className={`w-10 h-10 text-xl rounded-full flex items-center justify-center transition-all relative group
                      ${isCart ? 'text-red-500 hover:text-red-600  hover:scale-125 transition-all' : ''} 
                      ${isWishList ? 'text-red-500 w-fit rounded-md hover:scale-125' : ''}`}
                    onClick={() => { isWishList ? deleteFromWishlist(product._id) : deleteFromcart(product._id) }}
                  >
                    <FaTrashCan />
                    <div className={tooltipClass}>
                      {isCart ? 'Remove' : isWishList ? 'Remove' : 'Add to Wishlist'}
                    </div>
                  </button>

                  {/* Cart Button */}
                  <button
                    className={`hover:p-2 hover:text-2xl text-green-600 flex items-center justify-center relative group
                      ${isCart ? 'p-2 bg-red-500 rounded-full text-white hover:scale-125 transition-all hover:text-red-500 hover:bg-white' :
                      'hover:text-white hover:bg-green-600 hover:scale-125 flex justify-center items-center rounded-full text-xl transition-all'}`}
                    onClick={() => { isCart ? addProductTowishList(product._id) : addProductTocart(product._id) }}
                  >
                    {isWishList ? <FaCartPlus /> : <FaHeart />}
                    <div className={tooltipClass}>
                      {isCart ? 'Add to Wishlist' : 'Add to Cart'}
                    </div>
                  </button>
                </div>
              )}

              <div className="flex w-full">
                <div className="text-sm">{product.ratings}</div>
              </div>

              {/* Buy Now Button */}
              {!noBuy && <div className="w-full justify-end flex mt-2">
                <Link to={`/outlet/${product.category}/${product._id}`} className="bg-orange-500 hover:bg-[#f59a9ac7] transition-all rounded-sm w-2/5 text-center h-10 text-white flex items-center justify-center">
                  Buy Now
                </Link>
              </div>}
              <br />
                {isDate &&<div className="text-end text-gray-400 font-normal">Ordered On : <span className='text-green-600'> {product.createdAt}</span></div>}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
