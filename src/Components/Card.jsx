import React from 'react'
import { Link } from 'react-router-dom'
const Card = ({product}) => {

  return (
    <div className='w-[15%] max-h-[30vh] shadow-lg shadow-slate-100/40 flex flex-col items-center rounded hover:scale-105 overflow-auto' >
            <Link to={`/details/${product.id}`} className='w-full h-full'>
            <div className='h-[20vh] w-full bg-red-900 rounded '><img src={product.image} alt="" className='object-cover w-full h-full'/></div>
            <div className='bg-white w-full pt-5 h-[10vh]'>
              <h1 className='text-md text-black font-semibold '>{product.title}</h1>

            </div>
            </Link>
          </div>
  )
}

export default Card
