const images = [{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=791a660d9c2397ddd679980c6983b216/591f9758d109b3de80a0bb82c1bf6c81810a4c89.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=e8b1d9c798cad1c8d0bbfc2f4f3c67c4/ab5e4efbfbedab64dbb08428fa36afc37b311eed.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=a06847cac5fcc3ceb4c0c93ba244d6b7/85d3bc014a90f60394f557af3412b31bb151ed67.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=3792b3922da446237ecaa56aa8237246/c4be73094b36acaf746d5f1471d98d1000e99c1e.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=cbb0c62b3787e9504217f3642039531b/357828f5e0fe9925c181a0b839a85edf8cb1711e.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=d97763e5f5dcd100cd9cf829428a47be/bc48eec4b74543a96096332413178a82b801141e.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=0bce5a5ec4177f3e1034fc0540ce3bb9/a435064f78f0f73675c584e90755b319eac413f4.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=f480662e3cadcbef01347e0e9cae2e0e/8f5b1cd8bc3eb13517d8e851ab1ea8d3fc1f4489.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=ef3defefe8dde711e7d243fe97eecef4/906cfddcd100baa1f74e18514a10b912c9fc2e4e.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=b5dea914cefdfc03e578e3b0e43e87a9/45c1f303738da9774430d9c1bd51f8198718e38a.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=a3d88c1776899e51788e3a1c72a6d990/a65049086e061d959c5968d276f40ad163d9ca8a.jpg',
	},
	{
		path: 'http://imgsrc.baidu.com/forum/w%3D580/sign=f992cfd546fbfbeddc59367748f1f78e/6c7667d0f703918f03d163205c3d269758eec4ad.jpg',
	}
]

// 用于示例的模拟测试数据
let n = 0;
let tab = Array(10).fill('').map(() => 'tab_' + n++);
let DATA = {};
for (let i = 0; i < tab.length; i++) {
	const arr = [];
	for (let k = 0; k < 200; k++) {
		arr.push({text: tab[i] + ' ' + k + '项', img: images[Math.floor(Math.random() * images.length)].path, index: k });
	}
	DATA[tab[i]] = arr;
}

function mock({url, data} = {}) {
	return new Promise((resolve, reject) => {
		const {
			pageNum,
			pageSize,
			tabId
		} = data;
		setTimeout(() => {
			if (url === '1/testUrl') {
				const data = DATA[tabId];
				if (data) {
					const sendData = getData(data, pageNum, pageSize);
					resolve(sendData);
				} else {
					reject();
				}
			} else {
				reject();
			}
		}, 500)
	})
}

function getData(data, pno, psize) {
	const obj = {
		msg: 'success',
		code: 0
	};
	const page = {};
	let size = data.length;
	page.size = size;
	let lastPage = Math.ceil(size / psize);
	page.lastPage = lastPage;
	let startIndex = (pno - 1) * psize;
	let endIndex = startIndex + psize - 1;
	endIndex = endIndex > size - 1 ? size : endIndex;
	let d = data.slice(startIndex, endIndex + 1);
	d = JSON.parse(JSON.stringify(d));
	page.list = d;
	obj.page = page;
	return obj;
}

module.exports = {
	mock
}
