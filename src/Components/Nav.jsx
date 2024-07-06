import React, { useContext } from 'react'
import { ProductContext } from '../utils/Context'
import { Link, useLocation } from 'react-router-dom';
const Nav = () => {
  const {search,pathname}=useLocation();
  const [products]=useContext(ProductContext);
  let distinct_categoris=products && products.reduce((acc,cv)=>[...acc,cv.category],[]);
  distinct_categoris=[...new Set(distinct_categoris)];
  const diffColor=()=>{
    return `rgba(${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},${(Math.random()*255).toFixed()},70)`;
  }
  return (
    <div className='w-[15%] h-full bg-zinc-300 text-black flex flex-col items-center p-2 relative'>
        <Link to='/create' className='px-3 py-2 rounded-full text-white bg-orange-600 text-xl '>Add New Product</Link>
         <h1 className='text-2xl text-black mb-3 w-full mt-7 font-bold'>Category</h1>
         {
          distinct_categoris.map((category,i)=>{
          return  <Link to={`/?category=${category}`} key={i}  className=' mb-3 flex items-center w-[90%] text-xl rounded font-medium tracking-wide'> <span style={{background:diffColor()}} className='rounded-full mr-2 w-[20px] h-[20px]'></span> {category}</Link>
          })

        }
          {(pathname!='/' || search.length>0) &&
        (<Link className='absolute bottom-10 bg-red-400 px-3 py-1 rounded-md ' to="/">Home</Link>)
          }
          
      </div>
  )
}

export default Nav
