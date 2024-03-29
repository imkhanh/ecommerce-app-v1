import React, { useState } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { isWish, addToWishList, removeToWishList } from './Functions';

const ProductItem = ({ product }) => {
  const navigate = useNavigate();
  const [wishList, setWishList] = useState(JSON.parse(localStorage.getItem('wishList')));

  return (
    <div className="mb-8 relative flex flex-col w-full h-full bg-white border-b border-r border-black/10 select-none">
      {product.status && (
        <div className="absolute top-4 left-8 z-20">
          <span
            className={`py-[6px] px-4 rounded-full border border-black/10 text-xs uppercase font-semibold cursor-pointer ${
              product.status === 'New'
                ? 'border-black/10 text-black bg-white'
                : product.status === 'Sold Out'
                ? 'border-red-100 text-red-700 bg-red-100'
                : product.status === 'Sale' && 'bg-amber-100 text-amber-800 border-amber-100'
            }`}
          >
            {product.status}
          </span>
        </div>
      )}
      <div className="absolute top-4 right-8 z-20">
        <span
          onClick={() => addToWishList(product._id, setWishList)}
          className={`${isWish(product._id, wishList) ? 'hidden' : ''}  text-xl cursor-pointer`}
        >
          <BsHeart />
        </span>
        <span
          onClick={() => removeToWishList(product._id, setWishList)}
          className={`${
            !isWish(product._id, wishList) ? 'hidden' : ''
          } text-xl cursor-pointer text-blue-500`}
        >
          <BsHeartFill />
        </span>
      </div>
      <div className="overflow-hidden">
        <img
          alt={product.name}
          onClick={() => navigate(`/shop/product-detail/${product._id}`)}
          src={`/uploads/products/${product.images[0]}`}
          className="w-full h-[280px] md:h-full object-contain cursor-pointer"
        />
      </div>
      <div className="flex-shrink py-4 px-8 lg:px-4">
        <h4 className="font-medium truncate cursor-pointer">{product.name}</h4>
        <p className="font-normal">${product.price}.00</p>
      </div>
    </div>
  );
};

export default ProductItem;
