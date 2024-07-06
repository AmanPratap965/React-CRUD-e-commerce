import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "./Loading";
const CardDetails = () => {
  const navigate=useNavigate();
  const {id}=useParams();
  const [products,setproducts]=useContext(ProductContext);
  const [product,setproduct]=useState(null);
  const [description,setDescription]=useState('');
  const getProduct=()=>{
    const finalProduct=products.find(product=>product.id==(id));
    return finalProduct;
  }
  useEffect(() => {
    setproduct(getProduct());
  }, [id,products]);
  useEffect(() => {
    // console.log(product);
    if(product)
      setDescription(()=>DataLimit(product.description,250));
  }, [product]);
  const DataLimit=(data,limit)=>{
    return ( data.length>limit)?data.substr(0,limit)+'...':data; 
  }
  const ProductDeleteHandler=(id)=>{
    const updatedProducts=products.filter(product=>product.id!=id);
    setproducts(updatedProducts);
    localStorage.setItem('products',JSON.stringify(updatedProducts));
    alert("Product Deleted Successfully");  
    navigate('/');
  }
  return (product ?(
    <div className="w-[70%] h-screen bg-slate-500 m-auto p-[10%]">
      <div className="w-full h-full flex  justify-center  gap-x-10 p-10">
        <div className="w-[50%] h-full bg-green-900 ">
          <img
            src={product.image}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className=" w-[50%] p-3 flex flex-col justify-center" >
          <h1 className="text-4xl font-semibold mt-3  ">{product.title}</h1>
          <h3 className="text-md text-red-300/30">{product.category}</h3>
          <h2 className="text-xl mt-2 text-red-900 font-semibold">${product.price}</h2>
          <p className="w-full mt-10 p-4 text-black text-xl">
           "{description}"
          </p>
          
        <div className="flex gap-x-10 mt-10">
        <Link to={`/edit/${product.id}`} className="mr-5 py-2 px-5 border rounded border-blue-500 text-blue-300 w-fit font-semibold tracking-wide">Edit</Link>
        <button onClick={()=>ProductDeleteHandler(product.id)} className="py-2 px-5 border rounded border-red-500 text-red-300 w-fit font-semibold tracking-wide">Delete</button>
        </div>
        </div>
      </div>
        <Link className="px-3 py-1 bg-blue-800 w-fit text-white rounded mt-10 text-xl absolute" to='/'>Home</Link>
    </div>):(<h1>Data not Found...</h1>)
  );
};

export default CardDetails;
