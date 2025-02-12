import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { GoPackageDependencies } from "react-icons/go";
import { CiHeart } from "react-icons/ci";
import { BiSupport } from "react-icons/bi";
import { SlLogout } from "react-icons/sl";
import { useDispatch, useSelector } from 'react-redux';
import { clearStore } from '../../redux/userSlice';

export const ProfileTooltip = () => {
  const validUser = useSelector((state) => state.user);
  const logout = useDispatch()
  const logOut =async()=>{
    try {
      logout(clearStore())
      navigate('/')
      console.log('logout called')
      window.location.reload();
      console.log(validUser,'valid user from redux')
    } catch (error) {
      console.log('error while logging out')
      console.log(error.message)
    }
  }
  const userId = useSelector(state=>state.user)._id
  const navigate = useNavigate()
  return (
    <>
        <div className="flex flex-col bg-white z-50 text-gray-500 text-semibold shadow-lg w-[200px] rounded-md ">
            <Link className='hover:bg-gray-300 p-2 flex gap-3 items-center '><CgProfile /> My Info</Link>
            <Link className='hover:bg-gray-300 p-2 flex gap-3 items-center 'to={`/outlet/orders/${userId}`}><GoPackageDependencies />My Orders</Link>
            <Link to='/outlet/wishlist/flipkart' className='hover:bg-gray-300 p-2 flex gap-3 items-center '><CiHeart /> Wishlist</Link>
            <Link className='hover:bg-gray-300 p-2 flex gap-3 items-center '><BiSupport />Help and Support</Link>
            <div className='hover:bg-gray-300 p-2 flex gap-3 items-center group-last: relative'  onClick={logOut} ><SlLogout />Logout
            </div>
        </div>
    </>
  )
}
