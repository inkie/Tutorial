var getBodyBg = function() {
  var copy = { __proto__: null };
  copy['body background color'] = getComputedStyle(document.body).backgroundColor;
  return copy;
}

chrome.devtools.panels.elements.createSidebarPane(
  "Background Color",
  function(sidebar) {
    function update() {
      sidebar.setExpression("(" + getBodyBg.toString() + ")()");
    }
    update();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(update);
  });
