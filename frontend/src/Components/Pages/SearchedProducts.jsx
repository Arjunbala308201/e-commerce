import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import ProductCard from '../Subcomponents/ProductCard';

export const SearchedProducts = () => {

    const context = useOutletContext()
    const searchQuery = context.search
    console.log('searchquery',searchQuery)
    const [products,setProducts] = useState('')

    const getSelectedCategory = async()=>{
      try {
          const response = await axios.get(`http://localhost:4001/products?search=${searchQuery}`)
          console.log(`category ${searchQuery}`,response)
          setProducts(response.data)
      } catch (error) {
          console.log(error.message)
          console.log('error block runnig')
      }
  }
  useEffect(()=>{
    getSelectedCategory()
  },[])

  console.log('response.data',products)

  return (
    <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 h-auto  bg-gray-100 w-full">
          {products&& <ProductCard category={searchQuery} productList={products} />}
        </div>
    </>
  )
}
