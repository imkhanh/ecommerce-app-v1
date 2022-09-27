export const isAuth = () => (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false);

export const isAdmin = () =>
	localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).user.role === 1 : false;

export const logout = () => {
	localStorage.clear();

	window.location.href = '/';
};
