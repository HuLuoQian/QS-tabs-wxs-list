const STATUS = 1; //1-正式域名 2-测试域名
let baseUrl;
switch (STATUS){
	case 1:
		baseUrl = '1';	//正式域名
		break;
	default:
		baseUrl = '2';	//测试域名
		break;
}

var interfaces = {
	testUrlList: {
		testUrl: `${baseUrl}/testUrl`
	}
}

module.exports = interfaces;