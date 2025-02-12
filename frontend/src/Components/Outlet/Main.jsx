import React from 'react'
import {Outlet, useParams} from 'react-router-dom'
import { Header } from '../Pages/Header'

export const Main = ({isLogin}) => {

const searchQuery = useParams()

  return (
    <>
    <div className="bg-gray-100">
        <Header isLogin={isLogin}/>
        <div className="container mx-auto px-2 pt-4 sm:pt-10">
          <Outlet context = {searchQuery}/>
        </div>
        {/* <Footer/> */}
        {/* <SearchedProducts searchQuery={searchQuery}/> */}
    </div>
    </>
  )
}
