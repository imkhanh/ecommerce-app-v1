export const isWish = (id, wishList) => {
	if (wishList !== null && wishList.includes(id)) {
		return true;
	} else {
		return false;
	}
};

export const addToWishList = (id, setWishList) => {
	const wishArr = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [];

	if (wishArr) {
		if (!wishArr.includes(id)) {
			wishArr.push(id);
			setWishList(wishArr);
			localStorage.setItem('wishList', JSON.stringify(wishArr));
		}
	} else {
		wishArr.push(id);
		setWishList(wishArr);
		localStorage.setItem('wishList', JSON.stringify(wishArr));
	}
};

export const removeWishList = (id, setWishList) => {
	const wishArr = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : [];

	if (wishArr) {
		if (wishArr.includes(id)) {
			wishArr.splice(wishArr.indexOf(id), 1);
			setWishList(wishArr);
			localStorage.setItem('wishList', JSON.stringify(wishArr));
		}
	}
};
