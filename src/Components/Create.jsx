import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { ProductContext } from '../utils/Context';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import Nav from './Nav';
import { Navigate, useNavigate } from 'react-router-dom';
const Create = () => {
    const [products, setProducts] = useContext(ProductContext);
    // console.log(products)
    const navigate=useNavigate();
    const [title, setTitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("men's clothing");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const AddProductHandler=(e)=>{
        e.preventDefault();
        if(title.trim().length<5 || image.trim().length<5 || description.trim().length<5 || price.trim().length<1){
            return alert('Please fill all the fields');
        }
        const product={id:nanoid(),title, image, category, description, price};
        // console.log(product);
        setProducts([...products,product]);
        localStorage.setItem("products",JSON.stringify([...products,product]));  
        toast.success('Product Added Successfully')
        navigate('/');
    }
    useEffect(()=>{},[products]);
  return (
    <div className='flex justify-around items-center h-screen w-screen text-black '>
        <Nav/>
    <form onSubmit={AddProductHandler} className='p-20 w-[40vw] h-[70vh] bg-slate-500 '>
            <h1 className='mb-4 w-1/2 text-2xl text-slate-900 font-bold text-nowrap tracking-wide'>Add New Product</h1>
            {/* title */}
            <input className=' rounded p-2 w-full mb-2' type="text" placeholder='Title' onChange={(e)=>setTitle(e.target.value)} value={title}/>
            {/* image */}
            <input className=' rounded p-2 w-full mb-2' type="url" placeholder='Image URL' onChange={(e)=>setimage(e.target.value)} value={image}/>
            {/* price and Category */}
            <div className='flex w-full gap-5'>
            <select className='rounded p-2 w-1/2 mb-2' onChange={(e)=>{setcategory(e.target.value);}}>
                <option value="men's clothing">men's clothing</option>
                <option value="jewelery">Jewelry</option>
                <option value='electronics'>Electronics</option>
                <option value="women's clothing">Women's Clothing</option>
            </select>
            <input className=' rounded p-2 w-1/2 mb-2' type="number" placeholder='$ Price' onChange={(e)=>setprice(e.target.value)} value={price}/>
            </div>
            {/* Description */}
            <textarea placeholder='enter product description here...' className='rounded p-2 w-full mb-2' rows="10" value={description} onChange={(e)=>setdescription(e.target.value)}/>
            {/* Submit Button */}
            <button  className='px-3 py-2 tracking-wide rounded-sm text-white bg-orange-600 text-xl '>Add Product</button>
    </form>
      </div>
  
  )
}

export default Create