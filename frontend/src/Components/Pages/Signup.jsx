import React, { useState } from 'react'
import loginImg from '../../assets/login/loginimg.png'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export const Signup = () => {
    const [userDetails,setUserDetails] = useState({
        name:'',
        email:'',
        password:''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          [name]: value,
        }));
      };

    const signup = async()=>{
        if(userDetails.name.trim()===''||userDetails.name.trim()===''||userDetails.name.trim()===''){
            toast.warning('Please fill all input fields')
        }else{
            try {   
                console.log(userDetails,'will send to api')
                const response = await axios.post('http://localhost:4001/signup',userDetails)
                console.log(response.status,'status')
                console.log(response.data.toast,'toast')
                if(response.data.toast==='warning'){toast.error(response.data.message)}
                if(response.data.toast==='success'){toast.success(response.data.message)}
                if(response.status===200){setUserDetails({
                    name:'',
                    email:'',
                    password:''
                })}
            } catch (error) {
                console.log(error.message)
                toast.error(error.message)
            }
          }
        }
  return (
    <>
    <div className="flwx w-full h-screen py-10  bg-gray-100">
        <div className="flex w-2/3 mx-auto h-4/5 ">
            <div className="w-2/5 bg-blue-500 text-white p-10 justify-between flex flex-col">
            <div className="">
                <div className="text-3xl font-semibold ">Looks like you're new !</div>
                <br />
                <p className=''>Sign up with your mobile number to get started</p>
                </div>
                <div className="w-full">
                <img src={loginImg} alt="" className='w-2/3 mx-auto' />
                </div>
            </div>
            <div className="w-3/5 p-5 h-full bg-white flex flex-col justify-between">
                <div className="w-full">
                            <input type="text"
                            placeholder='Enter Name ' 
                            name='name' required 
                            value={userDetails.name}
                            onChange={(e)=>handleInputChange(e)}
                            className='border-0 border-b-2 outline-none rounded-md w-full py-2 text-gray-500 ps-2'
                            />
                            <input type="mail" 
                            placeholder='Enter Email ' 
                            name='email' required 
                            value={userDetails.email}
                            onChange={(e)=>handleInputChange(e)}
                            className='border-0 border-b-2 outline-none rounded-md w-full py-2 text-gray-500 ps-2'
                            />
                            <input type="password" 
                            placeholder='Enter Password ' 
                            name='password' required 
                            value={userDetails.password}
                            onChange={(e)=>handleInputChange(e)}
                            className='border-0 border-b-2 outline-none rounded-md w-full py-2 text-gray-500 ps-2'
                            />
                    <br />
                    <p className='text-gray-500 text-sm font-medium'>By continuing, you agree to Flipkart's 
                        <span className='text-blue-500'>Terms of Use</span> and <span className='text-blue-500'>Privacy Policy</span>.
                    </p>
                    <button className="bg-[#fb641b] text-white w-full text-center py-2 mt-5 hover:bg-[#fb661bcd]"
                    onClick={signup}
                    >
                        Verify
                    </button>
                </div>
                <div className="w-full flex justify-center items-center">
                    <Link to='/outlet/login' className= ' text-blue-500'>Existing User? Log in</Link>
                </div>
            </div>
            
        </div>

    </div>
    </>
  )
}
