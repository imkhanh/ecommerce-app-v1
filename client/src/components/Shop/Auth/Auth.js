export const isAuth = () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : false);
export const isAdmin = () => (localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).role === 0 : false);

export const logout = () => {
	localStorage.clear();
	window.location.href = '/';
};
