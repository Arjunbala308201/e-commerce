import React, { useEffect, useState } from 'react'
import { Card } from '../Subcomponents/Card'
import axios from 'axios'
import { useSelector } from 'react-redux'

export const MyOrders = () => {
    const userId = useSelector(state => state.user)._id;
    const [orders, setOrders] = useState([]);

    const getMyOrders = async () => {
        try {
            const response = await axios.get(`https://e-commerce-noec.onrender.com/orders/${userId}`);
            setOrders(response.data.data);
            console.log(response.data.data,'response data')
        } catch (error) {
            console.log(error.message);
            console.log("Error block runs");
        }
    };

    useEffect(() => {
        getMyOrders();
    }, [userId]); // Add userId as a dependency to prevent issues

    const ordersWithDate = orders.map(item => ({
        ...item.product,  // Spread all existing product properties
        createdAt: new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }));
    
    console.log(ordersWithDate,'with date');  

    
  return (
    <>
        <div className="flex flex-col">
            <div className="text-bold text-[20px] text-gray-800">
                My Orders
            </div>  
            <div className="flex flex-col gap-5">
                {ordersWithDate?.length>0 && <Card noBuy={true} productList={ordersWithDate} isDate={true}/>}
            </div>
        </div>
    </>
  )
}
