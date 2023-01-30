import React, { useContext, useEffect } from 'react';
import { BsEyeFill, BsTrashFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import DashboardLayout, { DashboardContext } from '.';
import { postAddToWish } from './FetchApi';
import { LayoutContext } from '../Layout';
import Loading from '../Common/Loading';

const UserWishListSection = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(DashboardContext);
  const { state: layoutState, dispatch: layoutDispatch } = useContext(LayoutContext);

  const { lists, loading } = state;

  useEffect(() => {
    fetchWishListProduct();

    // eslint-disable-next-line
  }, []);

  const fetchWishListProduct = async () => {
    dispatch({ type: 'loading', payload: true });

    try {
      const res = await postAddToWish();
      dispatch({ type: 'lists', payload: res.data.products });
      dispatch({ type: 'loading', payload: false });
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveItem = (id) => {
    const lists = localStorage.getItem('wishList')
      ? JSON.parse(localStorage.getItem('wishList'))
      : [];

    if (lists.length > 0) {
      lists.splice(lists.indexOf(id), 1);
      localStorage.setItem('wishList', JSON.stringify(lists));
      fetchWishListProduct();
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-8 pb-8 border-t-2 border-black shadow">
      <div className="mb-4 h-20 flex flex-col items-start justify-center border-b border-black/10">
        <h4 className="text-base font-semibold">My Wish List</h4>
        <p className="text-sm text-black/70">{lists && lists.length} products</p>
      </div>
      <div className="mt-4 bg-white overflow-x-auto rounded-sm">
        <table className="min-w-full text-sm divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-2 font-medium text-xs text-left text-black">Index</th>
              <th className="py-2 font-medium text-xs text-left text-black">Image</th>
              <th className="py-2 font-medium text-xs text-left text-black">Name</th>
              <th className="py-2 font-medium text-xs text-left text-black">Category</th>
              <th className="py-2 font-medium text-xs text-left text-black">Status</th>
              <th className="py-2 font-medium text-xs text-left text-black">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {lists && lists.length > 0 ? (
              lists.map((item, index) => {
                return (
                  <tr key={item._id}>
                    <td className="p-4 text-black/70">{index + 1}</td>
                    <td className="py-4 text-black/70">
                      <img
                        alt={item.name}
                        src={`/uploads/products/${item.images[0]}`}
                        className="w-14 h-14 object-cover"
                      />
                    </td>
                    <td className="py-4 text-black/70">{item.name}</td>
                    <td className="py-4 text-black/70">{item.category.name}</td>

                    <td className="py-4">
                      {layoutState.inCart && layoutState.inCart.includes(item._id) ? (
                        <span
                          onClick={() => layoutDispatch({ type: 'cartToggle', payload: true })}
                          className="py-[6px] px-4 rounded-full border  text-xs font-medium cursor-pointer select-none border-green-100 text-green-700 bg-green-100"
                        >
                          In Cart
                        </span>
                      ) : (
                        <span className="py-[6px] px-4 rounded-full border  text-xs font-medium cursor-pointer select-none border-gray-200 text-black/60 bg-gray-200">
                          In Stock
                        </span>
                      )}
                    </td>
                    <td className="py-4 text-black/70">
                      <div className="flex items-center space-x-4">
                        <span
                          onClick={() => navigate(`/shop/product-detail/${item._id}`)}
                          className="cursor-pointer select-none hover:text-blue-500"
                        >
                          <BsEyeFill />
                        </span>
                        <span
                          onClick={() => handleRemoveItem(item._id)}
                          className="cursor-pointer select-none hover:text-red-500"
                        >
                          <BsTrashFill />
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className="py-6 text-black/50 italic font-light">No product found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const UserWishList = () => {
  return <DashboardLayout children={<UserWishListSection />} />;
};

export default UserWishList;
