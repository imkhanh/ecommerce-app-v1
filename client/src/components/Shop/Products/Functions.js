export const isWish = (id, wishList) => {
	if (wishList !== null && wishList.includes(id)) {
		return true;
	}
};

export const addToWish = (id, setWishList) => {
	const list = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [];

	if (list.length > 0) {
		if (!list.includes(id)) {
			list.push(id);
			setWishList(list);
			localStorage.setItem('wishList', JSON.stringify(list));
		}
	} else {
		list.push(id);
		setWishList(list);
		localStorage.setItem('wishList', JSON.stringify(list));
	}
};

export const removeToWish = (id, setWishList) => {
	const list = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [];

	if (list.length > 0) {
		if (list.includes(id)) {
			list.splice(list.indexOf(id, 1));
			setWishList(list);
			localStorage.setItem('wishList', JSON.stringify(list));
		}
	}
};
