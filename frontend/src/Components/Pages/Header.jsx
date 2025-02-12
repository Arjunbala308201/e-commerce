import React from 'react'
import {useState,useEffect} from 'react'
import axios from 'axios';
import { SlMagnifier } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

import { Link, useNavigate } from 'react-router-dom';
import { FaBell } from "react-icons/fa6";
import { ProfileTooltip } from '../Subcomponents/ProfileTooltip';
import { Notification } from '../Subcomponents/Notification';
import flipkartLogo from '../../assets/basic/Flipkart-Logo.jpg';

export const Header = ({isLogin}) => {

  const [query, setQuery] = useState('')
  const [products,setProducts] =useState([])

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
  };

  const fetchProducts =async()=>{
    try {
      if(query.length >2){
        console.log('query',query)
        const suggestions = await axios.get(`http://localhost:4001/products?search=${query}`)
        setProducts(suggestions.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [query])

  const navigate = useNavigate()
  const navigateTologin=()=>{
  if(!isLogin){
    navigate('/outlet/login')
  }
}
  return (
    <>
      <div className="sm:flex w-full py-3 bg-white px-4 sm:px-6 md:px-10 md:gap-10 sm:h-20">
        <div className="flex w-full justify-between">
          <Link className="logo h-full sm:flex justify-center object-contain h-[40px] w-1/2 sm:w-auto " 
          to='/'>
            <img src={flipkartLogo} alt="" className='h-[40px] sm:h-[60px]'/>

          </Link>
        <div className="hidden sm:flex relative bg-gray-100 rounded-md p-2 items-center justify-center px-2 gap-2">
          <SlMagnifier /> 
          <div className="flex flex-col w-56 md:w-96">
          <input type="text" className='bg-transparent w-full outline-none'
          placeholder='Search for Products, Brands and more relative' 
          onChange={handleInputChange}/>

          </div>
                  {/* searchsuggesion */}
            <div className="absolute top-14 bg-white shadow-lg z-50 rounded-md w-full">
            {products&&query.length>2 && products.map((item)=>(
              <Link to={`/outlet/${item.name}`} className=''>
                <div className="flex h-full ps-2">
                
                <div className="flex h-full">
                  <FaSearch className='h-[30px]] w-[30px] text-gray-400 mr-2'  />
                  <img src= {item.image} className='object-contain h-[30px] w-[30px]' alt='product image'/>
                </div>
                <div  className="w-full text-start ps-3 hover:bg-gray-100 cursor-pointer text-gray-800">{item.brand} {item.name}</div >
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="flex justify-end md:gap-5 lg:gap-10 w-1/2">
          <button
          onClick={navigateTologin}
          className=" group flex gap-1 sm:gap-2 items-center rounded-lg border-0 hover:bg-blue-600 hover:text-white p-2 transition-all relative"
        >
          <CgProfile />
          <p className="hidden sm:flex relative font-semibold">{`${isLogin ? 'Profile' : 'Login'}`}</p>
          <FaChevronDown className="hidden sm:flex transform transition-transform duration-300 group-hover:rotate-180" />

          {/* Tooltip - Will only be visible on hover, and not affect button height */}
          <div className="absolute w- left-0 top-full pt-4  hidden group-hover:block transition-opacity duration-300 z-10">
            <div className="z-30">
            {isLogin&&<ProfileTooltip />}
            </div>
          </div>
        </button>

      {
        isLogin &&
        <div className="flex items-center justify-center sm:mt-2 h-8 w-8 sm:h-10 sm:w-10 p-2 h-full rounded-full hover:bg-blue-600 group transition-all group relative">
          <FaBell className="h-5 w-auto group-hover:text-white " />
          <div  className="group-hover:block hidden absolute top-10 pt-5 z-30 right-0">
            <Notification />
          </div>
        </div>
      }
        <Link to='/outlet/cart/flipkart' className="flex gap-2 group items-center rounded-lg border-0 hover:bg-blue-600 hover:text-white p-2 transition-all relative
        ">
        <IoCartOutline />
        <p className='hidden sm:flex text-semibold'>Cart</p>
        </Link >
        </div>
        </div>

        <div className="sm:hidden flex relative bg-gray-100 rounded-md p-2 items-center justify-center px-2 gap-2">
          <SlMagnifier /> 
          <div className="flex flex-col w-96">
          <input type="text" className='bg-transparent w-full outline-none'
          placeholder='Search for Products, Brands and more relative' 
          onChange={handleInputChange}/>

          </div>
                  {/* searchsuggesion */}
            <div className="absolute top-14 bg-white shadow-lg z-50 rounded-md w-full">
            {products&&query.length>2 && products.map((item)=>(
              <Link to={`/outlet/${item.name}`} className=''>
                <div className="flex h-full ps-2">
                
                <div className="flex h-full">
                  <FaSearch className='h-[30px]] w-[30px] text-gray-400 mr-2'  />
                  <img src= {item.image} className='object-contain h-[30px] w-[30px]' alt='product image'/>
                </div>
                <div  className="w-full text-start ps-3 hover:bg-gray-100 cursor-pointer text-gray-800">{item.brand} {item.name}</div >
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
