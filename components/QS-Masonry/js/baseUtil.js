const isNumber = function(arg) {
	return typeof arg === 'number';
}
const isArray = function(arg) {
	return Object.prototype.toString.call(arg) === '[object Array]';
}
const isArrayHasLen = function(arr) {
	return isArray(arr) && arr.length > 0;
}
const isFn = function(fn) {
	return fn && typeof(fn) === "function";
}
const isObject = function(arg) {
	return Object.prototype.toString.call(arg) === '[object Object]';
}
const isPromise = function(obj) {
	return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
const isUndef = function(arg) {
	return arg === undefined;
}
const isNull = function(arg) {
	return arg === null;
}
const isString = function(arg) {
	return typeof arg === 'string';
}


module.exports = {
	isNumber,
	isArray,
	isArrayHasLen,
	isFn,
	isObject,
	isPromise,
	isUndef,
	isNull,
	isString
}