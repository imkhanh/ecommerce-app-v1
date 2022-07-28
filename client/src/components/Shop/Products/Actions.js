export const isWish = (id, wishList) => {
	if (wishList !== null && wishList.includes(id)) {
		return true;
	} else {
		return false;
	}
};
export const addWish = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];
	if (list.length > 0) {
		if (!list.includes(id)) {
			list.push(id);
			setWishList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	} else {
		list.push(id);
		setWishList(list);
		localStorage.setItem('wish', JSON.stringify(list));
	}
};
export const removeWish = (id, setWishList) => {
	const list = localStorage.getItem('wish') ? JSON.parse(localStorage.getItem('wish')) : [];
	if (list.length > 0) {
		if (list.includes(id)) {
			list.splice(list.indexOf(id), 1);
			setWishList(list);
			localStorage.setItem('wish', JSON.stringify(list));
		}
	}
};
