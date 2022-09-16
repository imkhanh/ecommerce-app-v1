export const isAuth = () => (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false);

export const isAdmin = () => (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).user.userRole === 1 : false);

export const logout = () => {
	localStorage.removeItem('auth');
	localStorage.removeItem('cart');
	localStorage.removeItem('wish');

	window.location.href = '/';
};
