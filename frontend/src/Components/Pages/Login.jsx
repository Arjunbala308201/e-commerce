import React, { createContext, useState } from 'react'
import loginImg from '../../assets/login/loginimg.png'
import { Link, useNavigate } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/userSlice'

export const Login = ({setIsLogin}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [userDetails,setUserDetails] = useState({
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
      const loginToaccount = async()=>{
        if(userDetails.email.trim()===''||userDetails.password.trim()===''){
            toast.warning('Please fill all input fields')
        }else{
            try {   
                console.log(userDetails,'will send ti api')
                const response = await axios.post('http://localhost:4001/login',{userDetails})
                console.log(response.status,'status')
                console.log(response.data.userDetails,'userDetals from response')
                const userFromdb = response.data.userDetails
                if(response.data.toast ==='error'){toast.error(response.data.message)}
                if(response.data.toast ==='success'){
                    toast.success(response.data.message)
                    setUserDetails({
                    name:'',
                    email:'',
                    password:''
                })
                console.log(userFromdb,'before dispatch')
                dispatch(setUser(userFromdb))
                console.log('dipsatched to redux store')
                console.log('IsLogin is sets to true and sent to app.js')
                console.log('Login successfull')
                navigate('/')
            }
            } catch (error) {
                console.log(error.message)
            }
          }
        }

  return (
    <>
    <div className="flwx w-full h-screen py-10 bg-gray-100">
        <div className="flex w-2/3 mx-auto h-4/5 ">
            <div className="w-2/5 bg-blue-500 text-white p-10 justify-between flex flex-col">
            <div className="">
                <div className="text-3xl font-semibold ">Login</div>
                <br />
                <p className=''>Get access to your Orders, Wishlist and Recommendations</p>
                </div>
                <div className="w-full">
                <img src={loginImg} alt="" className='w-2/3 mx-auto' />
                </div>
            </div>
            <div className="w-3/5 p-5 h-full bg-white flex flex-col justify-between">
                <div className="w-full">

                            <input type="mail" 
                            placeholder='Enter Email ' 
                            name='email' required 
                            value={userDetails.email}
                            onChange={(e)=>handleInputChange(e)}
                            className='border-0 border-b-2 ps-2 outline-none rounded-md w-full py-2 text-gray-500'
                            />
                            <input type="password" 
                            placeholder='Enter Password ' 
                            name='password' required 
                            value={userDetails.password}
                            onChange={(e)=>handleInputChange(e)}
                            className='border-0 border-b-2 ps-2 outline-none rounded-md w-full py-2 text-gray-500'
                            />

                    <br />
                    <p className='text-gray-500 text-sm font-medium mt-2'>By continuing, you agree to Flipkart's <span className='text-blue-500'>Terms of Use</span> and <span className='text-blue-500'>Privacy Policy</span>.</p>
                    <button className="bg-[#fb641b] text-white w-full text-center py-2 mt-5 hover:bg-[#fb661bcd]"
                    onClick={loginToaccount}>
                        Login
                    </button>
                </div>

                <div className="w-full flex justify-center items-center">
                <Link to='/outlet/signup' className= ' text-blue-500'>New to Flipkart? Create an account</Link>
                </div>
            </div>
            
        </div>

    </div>
    </>
  )
}
