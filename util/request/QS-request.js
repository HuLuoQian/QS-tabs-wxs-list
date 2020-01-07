import _app from '@/util/request/app.js';
import interfaces from '@/util/request/interfaces.js';
import { mock } from './mock.js';

export function QSRequest({
	urlField,
	sendData,
	checkType,
	field,
	check,
	filterFn,
	hasLoading
} = {}) {
	return new Promise((resolve, reject) => {
		if (hasLoading) _app.showLoading('请稍候');
		const hasFilterFn = _app.isFn(filterFn);
		const url = getField(interfaces, urlField);
		//为了便于示例
		let fn;
		if(mock) {
			fn = mock;
		}else{
			fn = request;
		}
		_app.log('准备访问接口:' + JSON.stringify(sendData));
		fn({
			url,
			...sendData
		}).then(res => {
			_app.log('访问接口成功:' + JSON.stringify(res));
			if (hasLoading) _app.hideLoading();
			let checkResult = true;
			if (check !== false) {
				checkResult = checkRes({
					res,
					type: checkType
				})
			}
			if (checkResult) {
				const data = getField(res, field);
				resolve(hasFilterFn ? filterFn(data) : data);
			} else {
				reject(res);
			}
		}).catch(err => {
			if (hasLoading) _app.hideLoading();
			reject(err);
		})
	})
}

function checkRes(obj) {	//对于返回数据的健壮性判断
		let {
			res,
			type
		} = obj;
		if (!res) return false;
		type = type !== undefined ? type : 'msgAndCode';
		switch (type) {
			case 'msgAndCode':
				if (res) {
					if (res.msg === 'success' && res.code === 0) {
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
				break;
			default:
				return false;
				break;
		}
	}

export function getField(data, fields, pattern) { //字符串.获取指定字段数据
	if (!fields) return data;
	var arr = fields.split('.');
	var key = arr.shift();
	var value = data[key];

	if (value == null) {
		return value;
	} else if (arr.length == 0) {
		if (!pattern) return value;
		var type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '');
		if (pattern === true) {
			return type;
		} else if (!pattern) {
			return value;
		} else {
			return type == pattern;
		}
	}

	var result = getField(value, arr.join('.'), pattern);
	return result;
}

function request(obj) {
	let _this = this;
	return new Promise((resolve, reject) => {
		try {
			const config = {
				header: {}
			};
			if (obj.contentType === 'json') {
				config.header['Content-type'] = 'application/json'
			} else {
				config.header['Content-type'] = 'application/x-www-form-urlencoded'
			}
			if (!obj.method) {
				obj.method = 'POST'
			}
			_app.log(
				`访问接口 url: ${obj.url}, data: ${JSON.stringify(obj.data)}, method: ${obj.method}, header: ${JSON.stringify(config.header)}`
			);
			uni.request({
				...obj,
				...config,
				success(res) {
					if (res.statusCode === 200) {
						resolve(res.data);
					}else{
						reject(res);
					}
				},
				fail(err) {
					reject(err)
				}
			});
		} catch (e) {
			//TODO handle the exception
			reject(e)
		}
	})
}
