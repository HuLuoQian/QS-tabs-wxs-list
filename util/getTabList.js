import { QSRequest } from '@/util/request/QS-request.js';
function getTabList(data) {
	return QSRequest({
		urlField: 'testUrlList.testUrl',
		sendData: data,
		field: 'page'
	});
}

function filterTabList(list) {
	
}

module.exports = {
	getTabList
}