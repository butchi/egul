window.licker = window.licker || {};
(function(ns) {
  var egul = new Egul();

  egul.renderHtml();

  egul.renderAssets([
    'css/style.css',
    'js/main.js',
  ]);

  console.log('Thanks, world!');
})(window.licker);
