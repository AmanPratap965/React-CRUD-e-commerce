import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { nanoid } from "nanoid";
import { toast } from 'react-toastify';
import Nav from "./Nav";
import { useNavigate, useParams } from "react-router-dom";
const Create = () => {
  const { id } = useParams();
  const [products, setProducts] = useContext(ProductContext);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    price: "",
  });

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      product.title.trim().length < 5 ||
      product.image.trim().length < 5 ||
      product.description.trim().length < 5 ||
      product.price.trim().length < 1
    ) {
      alert("Please fill all the fields");
      return;
    }
    // how to update the product in products array
    const pi=products.findIndex((p)=>p.id==id);
    const newProducts = [...products];
    newProducts[pi] = product;
    setProducts(newProducts);
    localStorage.setItem("products", JSON.stringify(newProducts));
    // console.log(newProducts);
    navigate(-1);
    toast.success("Product Updated Successfully");
  };

  const changeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  useEffect(() => {
    
      const foundProduct = products.find((product) => product.id == id);
        setProduct(foundProduct);
      
    

   
  }, [ products]);
  
  
  // console.log(product);

  return (
    <div className="flex justify-around items-center h-screen w-screen text-black ">
      <Nav />
      <form
        onSubmit={AddProductHandler}
        className="p-20 w-[40vw] h-[70vh] bg-slate-500 "
      >
        <h1 className="mb-4 w-1/2 text-2xl text-slate-900 font-bold text-nowrap tracking-wide">
          {id ? "Edit Product" : "Add New Product"}
        </h1>
        {/* title */}
        <input
          className="rounded p-2 w-full mb-2"
          type="text"
          placeholder="Title"
          onChange={changeHandler}
          name="title"
          value={product.title || ""}
        />
        {/* image */}
        <input
          className="rounded p-2 w-full mb-2"
          type="url"
          name="image"
          placeholder="Image URL"
          onChange={changeHandler}
          value={product.image || ""}
        />
        {/* price and Category */}
        <div className="flex w-full gap-5">
          <select
            className="rounded p-2 w-1/2 mb-2"
            onChange={changeHandler}
            name="category"
            value={product.category || ""}
          >
            <option value="">Select Category</option>
            <option value="men's clothing">men's clothing</option>
            <option value="jewelery">Jewelry</option>
            <option value="electronics">Electronics</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
          <input
            className="rounded p-2 w-1/2 mb-2"
            type="number"
            name="price"
            placeholder="$ Price"
            onChange={changeHandler}
            value={product.price || ""}
          />
        </div>
        {/* Description */}
        <textarea
          placeholder="enter product description here..."
          className="rounded p-2 w-full mb-2"
          rows="10"
          name="description"
          value={product.description || ""}
          onChange={changeHandler}
        />
        {/* Submit Button */}
        <button className="px-3 py-2 tracking-wide rounded-sm text-white bg-orange-600 text-xl ">
          {id ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default Create;
