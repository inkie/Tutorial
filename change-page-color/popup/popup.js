const getColors = async () => {
  return new Promise(resolve => {
   chrome.storage.local.get(['colors'], function(result) {
    resolve(result.colors || ['rgb(229,87,79)', 'rgb(87,176,194)', 'rgb(241,209,117)']);
   });
  })
};

const changeColor = (color) => {
  chrome.tabs.query({active: true,currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'changeColor', data: color});
  });
}

$(function() {
  (async () => {
    const colors = await getColors();

    colors.forEach( color => {
      $('.colors').append(`<span data-color=${color} style="background: ${color};"/>`);
    })

    $('.colors span').on('click', function(){
      changeColor($(this).data('color'));
    })
   })()

  // $('.changeColor').on('click', function () {
  //   const color = $(this).data('color');
  //   chrome.tabs.query({active: true,currentWindow: true}, tabs => {
  //       console.log('clicked', color)
  //       alert('xxx');
  //       chrome.tabs.sendMessage(tabs[0].id, {type: 'changeColor', data: color});
  //     }
  //   );
  // })

  $('.createTab').on('click', () => {
    chrome.tabs.create({ url: './newPage.html' });
  })
});

var content="This is Popup";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	console.log('request received', request);
	if (request.type === 'changeColor') {
		document.body.style.background = request.data;
	}
});
       

// document.addEventListener('DOMContentLoaded', function () {
//   dumpBookmarks();
// });
