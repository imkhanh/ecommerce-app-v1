export const isAuth = () => (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : []);
export const isAdmin = () => (localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')).user.role === 1 : []);
