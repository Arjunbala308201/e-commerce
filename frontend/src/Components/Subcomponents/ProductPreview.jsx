import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProductPreview = () => {

  const userId = useSelector(state=>state.user)._id
    const id = useParams().productId

    const[product,setProduct] = useState({})

    const getSpecificProduct=async()=>{
        try {
          console.log('fetching function runs')
          const specificProduct = await axios.get(`https://e-commerce-noec.onrender.com/products?search=${id}`)
          console.log(specificProduct,'response')
          setProduct(specificProduct.data)
        } catch (error) {
          console.log(error.message)
        }
    }
    const addTocart=async(id)=>{
        try {
          console.log(id,'id')
            const response = await axios.post(`http://localhost:4001/cart/add/${userId}`,{productId:id})
            console.log(response)
            console.log(response.data.message)
            
            if(response.data.toast==='success'){
                toast.success(response.data.message)
            }
            if(response.data.toast==='warning'){
                toast.warning(response.data.message)
            }
        } catch (error) {
            console.log(error.message)  
        }
    }
    const handleAddToCart = (id) => {
      if (!userId) {
        toast.warning("Login to add items to the cart!")
      }
     if(userId) {addTocart(id)}
     
    };
    useEffect(()=>{
        getSpecificProduct()
    },[])

    const navigate = useNavigate();

    const goBack = () => {
      navigate(-1); // Navigate to the previous route
    };
    const handleNavigate=(productId)=>{
      if(userId){
        navigate(`/outlet/buynow/${productId}`)
      }
      if(!userId){
        toast.warning('Please Login to buy')
    }
  }

 return (
    <div className="max-w-4xl mx-auto border rounded-lg shadow-lg p-4 bg-white">
      <div className="flex flex-wrap md:flex-nowrap gap-5">
        {/* Product Image */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={product[0]?.image} // Replace with the product? image URL
            alt="Product"
            className="rounded-lg object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-2/3 p-4 space-y-4">
          {/* Product Title */}
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-red-500 text-white text-sm rounded-lg">
              New Launches
            </span>
            <h1 className="text-xl font-bold">{product[0]?.brand} {product[0]?.name} {product[0]?.model} {product[0]?.category==='mobiles'?('8 GB Ram'):('')}</h1>
          </div>

          {/* Ratings */}
          <div className="flex flex-col w-full justify-start items-start gap-2 text-gray-600">
            <div className="text-green-600 font-semibold"> {product[0]?.rating}★ </div>
            <div> {product[0]?.review} reviews</div>
          </div>

          {/* Pricing */}
          <div className="space-y-2">
            <div className="text-3xl font-bold text-green-600">₹ {product[0]?.specialPrice }</div>
            <div className="text-gray-500 line-through">₹ {product[0]?.price}</div>
            <div className="text-sm text-green-600">16% off</div>
          </div>

          {/* Offers */}
          <div className="space-y-2">
            <h3 className="font-semibold">Available offers</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</li>
              <li>₹1000 Off On All Banks Credit and Debit Card Transactions</li>
              <li>Special Price Get extra ₹2000 off</li>
              <li>No cost EMI ₹5,000/month. Standard EMI also available</li>
            </ul>
          </div>

          {/* Buy Options */}
          <div>
            <h3 className="font-semibold">Exchange Offers</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="radio" name="exchange" defaultChecked />
                <span>Buy without Exchange ₹2{product[0]?.specialPrice}</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="exchange" />
                <span>
                    Buy with Exchange up to ₹{product[0]&&(product[0].specialPrice * 0.75).toFixed(2)} off
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-between mt-4 text-xs sm:text-sm">
          <div className="flex gap-4 ">
            <button className="px-2 md:px-6 py-2 bg-orange-500 font-semibold text-white rounded-sm hover:bg-orange-600"
            onClick={()=>handleAddToCart(product[0]._id)} >
              Add to Cart
            </button>
            <button onClick={()=>handleNavigate(product[0]._id)} 
             className="px-2 md:px-6 py-2 bg-green-500 font-semibold text-white rounded-sm hover:bg-green-600">
              Buy Now
            </button>
          </div>
          <Link onClick={goBack}
           className="px-2 md:px-6 py-2 bg-red-500 font-semibold text-white  rounded-sm hover:bg-red-600">
              Back
          </Link>

          </div>
        </div>
      </div>
    </div>
  );
};