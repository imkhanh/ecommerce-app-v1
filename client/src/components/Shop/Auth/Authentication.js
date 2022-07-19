export const isAuth = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : false);
export const isAdmin = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')).user.role === 0 : false);

export const logout = () => {
	localStorage.clear();

	window.location.href = '/';
};
