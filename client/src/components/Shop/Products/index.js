import React, { createContext, useReducer } from 'react';
import Layout from '../Layout';
import ProductSection from './ProductSection';

export const ProductsContext = createContext();

const initalState = {
  products: [],
  sideBarToggle: false,
  loading: false,
};

const productsReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'products':
      return { ...state, products: action.payload };
    case 'sideBarToggle':
      return { ...state, sideBarToggle: action.payload };
    case 'loading':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const Products = () => {
  const [state, dispatch] = useReducer(productsReducer, initalState);

  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      <Layout children={<ProductSection />} />
    </ProductsContext.Provider>
  );
};

export default Products;
