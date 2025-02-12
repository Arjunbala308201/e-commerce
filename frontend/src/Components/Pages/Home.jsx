import React, { useEffect, useState } from 'react'
import { Header } from './Header'
import { ProductFilter } from './ProductFilter'
import { Carousel } from '../Subcomponents/Carousel'
import { Recommendations } from '../Subcomponents/Recommendations'
import monitor from '../../assets/Recommendations/electronics/monitor.jpeg'
import camera from '../../assets/Recommendations/electronics/camera.jpg'
import speakers from '../../assets/Recommendations/electronics/speakers.jpg'
import trimmer from '../../assets/Recommendations/electronics/trimmer.jpeg'
import smartwatch from '../../assets/Recommendations/electronics/smartwatch.avif'
import printer from '../../assets/Recommendations/electronics/printors.jpg'
import bat from '../../assets/Recommendations/sports/bats.jpeg'
import books from '../../assets/Recommendations/sports/book.jpg'
import cycle from '../../assets/Recommendations/sports/cycle.jpg'
import homedecor from '../../assets/Recommendations/sports/home decorations.jpeg'
import keyboard from '..//../assets//Recommendations/sports/keyboard.jpg'
import rctoys from '../../assets/Recommendations/sports/rctoys.jpeg'
import { useSelector } from 'react-redux'

export const Home = () => {

  const[isLogin,setIslogin] = useState(false)
  const user = useSelector((state)=>state.user)
  const userID = user._id

  const Electroncics = [
    {
      image:monitor,
      title:'Monitor',
      starts:'6,999'
    },{
      image:speakers,
      title:'Speakers',
      starts:'899'
    },{
      image:smartwatch,
      title:'Smart Watches',
      starts:'999'
    },{
      image:trimmer,
      title:'Trimmers',
      starts:'599'
    },{
      image:printer,
      title:'Printors',
      starts:'2499'
    },{
      image:camera,
      title:'Camera',
      starts:'4,999'
    }
  ]
  const sportsAndToys = [
    {
      image:bat,
      title:'Cricket Bats',
      starts:'999'
    },{
      image:rctoys,
      title:'Remote Controll Toys',
      starts:'499'
    },{
      image:cycle,
      title:'Gear Cycles',
      starts:'6999'
    },{
      image:keyboard,
      title:'Musical Instruments',
      starts:'4,999'
    },{
      image:books,
      title:'Books',
      starts:'99'
    },{
      image:homedecor,
      title:'Home Decors',
      starts:'199'
    }
  ]
    useEffect(() => {
      userID&&user&&setIslogin(true)
      console.log(isLogin)
    }, [])
  return (
   <>
    <div className="bg-gray-100 flex flex-col">
        <Header isLogin={isLogin}/>
        <div className="p-2">
        <ProductFilter/>
        </div>
        <div className="pb-3">
        <Carousel/>
        </div>
        <div className="p-2">
        <Recommendations  data={Electroncics} heading={'Best of Electronics'}/>
        </div>
        <div className="p-2">
        <Recommendations  data={sportsAndToys} heading={'Sports & Lifestyle'}/>
        </div>
        {/* <Footer/> */}
    </div>
   </>
  )
}
