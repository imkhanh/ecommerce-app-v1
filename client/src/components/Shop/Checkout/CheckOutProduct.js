import React from 'react';
import { totalPrice, totalQuantity } from '../CartModal/Functions';

const CheckOutProduct = ({ products }) => {
  return (
    <div>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">${totalPrice()}</span>
        <span className="text-base text-black/70">For the purchase of</span>
      </div>

      <div className="divide-y divide-gray-200">
        {products && products.length > 0 ? (
          products.map((product) => {
            return (
              <div key={product._id} className="flex items-center justify-between">
                <div className="py-4 flex  items-center">
                  <img
                    alt={product.name}
                    src={`/uploads/products/${product.images[0]}`}
                    className="w-24 h-24 object-cover"
                  />
                  <div>
                    <p className="text-sm md:text-xs text-black">{product.name}</p>
                    <p className="text-sm md:text-xs text-black/70">{product.category.name}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <p className="text-base font-semibold">${product.price}</p>
                  <p className="text-xs text-black/70">x{totalQuantity(product._id)}</p>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <p>No product found for checkout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckOutProduct;
