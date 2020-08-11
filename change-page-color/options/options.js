 var content = 'This is option page!';

 const getColors = async () => {
   return new Promise(resolve => {
    chrome.storage.local.get(['colors'], function(result) {
      resolve(result.colors || ['rgb(229,87,79)', 'rgb(87,176,194)', 'rgb(241,209,117)']);
    });
   })
 };

 const setColors = colors => {
  return new Promise(resolve => {
    chrome.storage.local.set({colors}, resolve);
   });
 };

 const showSuccess = () => {
   $('.success').addClass('show');
 }

 $(function() {
   (async () => {
    const colors = await getColors();

    colors.forEach( color => {
      $('.colors').append(`<input type="text" value=${color}>`);
    })
   })()

   $('.save').on('click', function (){
     const newColors = [];
     $('.colors input').each(function(){
        newColors.push($(this).val());
     })
    
     setColors(newColors).then(showSuccess);
   });
});
