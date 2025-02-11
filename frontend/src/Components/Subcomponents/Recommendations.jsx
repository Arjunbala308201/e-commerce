import React from 'react'

export const Recommendations = ({data,heading}) => {
    // console.log(data);
  return (
    <>
    <div className="bg-white ">
        <div className='text-2xl font-semibold w-full px-10 py-2'> {heading}</div>
        <div className="flex w-full justify-start items-center">
            {
                data.map((data,index) =>(
                    
                    <div className="flex justify-around w-full cursor-pointer " key={index}>
                    <div className="flex flex-col group">
                        <div className="flex w-24 h-24 mb-2">
                            <img src={data.image} alt="" className='object-contain group-hover:scale-110 transition-all'/>
                        </div>
                        <div className="text-md w-full text-center z-10">
                            {data.title}
                        </div>
                        <div className="text-md w-full text-center font-semibold">
                            {`From ₹ ${data.starts}`}
                        </div>
                    </div>
                    </div>
                ))
            }
        </div>
        </div>
    </>
  )
}
