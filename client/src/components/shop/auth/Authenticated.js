export const isAuth = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')) : []);
export const isAdmin = () => (localStorage.getItem('jwt') ? JSON.parse(localStorage.getItem('jwt')).user.role === 1 : []);
