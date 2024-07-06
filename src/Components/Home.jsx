import React, { useContext, useEffect, useState } from 'react'
import Card from './Card'
import Nav from './Nav'
import { ProductContext } from '../utils/Context'
import Loading from './Loading'
import { useLocation } from 'react-router-dom'
import axios from '../utils/axios'

import {Planets} from 'react-preloaders';
const Home = () => {
    const [products,setproducts]=useContext(ProductContext);
    const {search}=useLocation();
    const [filteredProducts, setFilteredProducts] = useState([]);
    const category=decodeURIComponent( search.split("=")[1]);
    const getProductCategory=async()=>{
      const filterproducts=products.filter(product=>product.category===category);
      if(filterproducts.length>0)
        setFilteredProducts(filterproducts);
      // try{
      //     const {data}= await axios.get(`/products/category/${category}`);
      //     setFilteredProducts(data);
      //   }
      //   catch(err)
      //   {
      //     console.log(err)
      //   }
      }
      
      
    useEffect(()=>{
      if(category!="undefined")getProductCategory();
      else{setFilteredProducts(products)}
    },[category,products]);

  return products.length>0?
    (<div className='h-screen w-full flex bg-slate-800 pt-10 text-zinc-100 '>
        {/* Nav */}
            <Nav/>
      {/* Cards Container */}
      <div className='w-[85%] h-full flex gap-7 p-5 flex-wrap overflow-x-hidden'>
          {/* card */}
          {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <Card key={product.id} product={product} />
          ))
        ) : (
          products.map(product => (
            <Card key={product.id} product={product} />
          ))
        )}
      </div>
    </div>)
  :(<Planets background="#000" color={'rgb(158, 38, 102)'}/>
  )
}

export default Home
