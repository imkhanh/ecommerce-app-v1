import { LayoutContext } from './Layout';
import { layoutReducer, layoutState } from './Layout/LayoutContext';

import Home from './Home';
import Product from './SingleProduct';
import Products from './Products';
import Checkout from './Checkout';
import PageNotFound from './Common/PageNotFound';

import UserProfile from './UserDashboard/UserProfile';
import UserWishList from './UserDashboard/UserWishList';
import UserOrder from './UserDashboard/UserOrder';
import ChangePassword from './UserDashboard/ChangePassword';

export {
	LayoutContext,
	layoutReducer,
	layoutState,
	Home,
	Product,
	Products,
	Checkout,
	PageNotFound,
	UserProfile,
	UserWishList,
	UserOrder,
	ChangePassword,
};
