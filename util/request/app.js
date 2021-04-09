var app = {
	log(t) {
		// console.log(t);
	},
	showLoading(title) {
		uni.showLoading({
			title
		})
	},
	hideLoading() {
		uni.hideLoading();
	},
	isFn(fn) {
		return fn && typeof fn === 'function';
	}
}

module.exports = app;