import React from 'react'

export const Recommendations = ({data,heading}) => {
    // console.log(data);
  return (
    <>
<div className="bg-white">
    <div className="text-2xl font-semibold w-full px-10 py-2">{heading}</div>
    
    {/* Grid Layout */}
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 w-full justify-center px-5">
        {data.map((data, index) => (
            <div className="cursor-pointer flex flex-col items-center group" key={index}>
                <div className="w-24 h-24 mb-2 flex justify-center">
                    <img src={data.image} alt="" className="object-contain group-hover:scale-110 transition-all"/>
                </div>
                <div className="text-md text-center z-10">{data.title}</div>
                <div className="text-md text-center font-semibold">{`From ₹ ${data.starts}`}</div>
            </div>
        ))}
    </div>
</div>

    </>
  )
}
