import React from 'react'
import appliances from '../../assets/LinkImages/appliances.webp'
import bike from '../../assets/LinkImages/bike.webp'
import dolls from '../../assets/LinkImages/dolls.png'
import electronics from '../../assets/LinkImages/electronics.jpg'
import fashion from '../../assets/LinkImages/fashion.png'
import flight from '../../assets/LinkImages/flight.webp'
import groceries from '../../assets/LinkImages/grocerries.webp'
import furniture from '../../assets/LinkImages/home furnishings.jpg'
import mobiles from '../../assets/LinkImages/mobiles.jpeg'
import { Link } from 'react-router-dom'

export const ProductFilter = () => {
    const dataTomap = [
        {
            img:groceries,
            text:'Groceries',
            path:'groceries'
        },{
            img:mobiles,
            path:'mobiles',
            text:'Mobiles'
        },{
            img:fashion,
            path:'fashion',
            text:'Fashion'
        },{
            img:electronics,
            path:'electronics',
            text:'Electronics'
        },{
            img:furniture,
            path:'furnishings',
            text:'Furnishings'
        },{
            img:appliances,
            path:'appliances',
            text:'Appliances'
        },{
            img:flight,
            path:'flight',
            text:'Flight Bookings'
        },{
            img:dolls,
            path:'toys',
            text:'Toys & More'
        },{
            img:bike,
            path:'bikes',
            text:'Bikes'
        }
    ]
  return (
    <>
        <div className="flex bg-white w-full justify-around py-5 px-10 ">
            {
                dataTomap.map((data,index)=>(
                    <Link  key={index} to={`/outlet/${data.path}`} className="flex flex-col w-full h-full group transition-all" >
                        <div className="flex justify-center">
                            <img src={data.img} alt="" className='h-16 w-16 object-contain group-hover:scale-125 transition-all'/>
                        </div>
                        <div className='w-full font-semibold text-center '>{data.text}</div>
                    </Link>
                )) 
            }
        </div>
    </>
  )
}
