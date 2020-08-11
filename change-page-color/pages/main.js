var content = 'This is extension tab page';
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('request received', request);
	if (request.type === 'changeColor') {
		document.body.style.background = request.data;
	}
});
       