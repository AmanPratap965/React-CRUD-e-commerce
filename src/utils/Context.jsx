import React, { useEffect, useState } from 'react';
export const ProductContext = React.createContext();
import axios from './axios';

const Context = (props) => {
  const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem('products');
    return localData ? JSON.parse(localData) : [];
  });

  const getProducts = async () => {
    try {
      const res = await axios.get('/products');
      setProducts(res.data);
      localStorage.setItem('products', JSON.stringify(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      getProducts();
    }
  }, [products]);

  return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  );
}

export default Context;
