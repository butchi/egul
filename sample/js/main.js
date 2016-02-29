window.licker = window.licker || {};
(function(ns) {
  console.log('Hello, world!');

  var egul = new Egul({
  });

  egul.renderDom();

  egul.renderAsset({
    fileType: 'html',
    fileName: 'index.html',
    elm: document.querySelector('.block-source--html'),
  });
  egul.renderAsset({
    fileType: 'css',
    fileName: 'css/style.css',
    elm: document.querySelector('.block-source--css'),
  });
  egul.renderAsset({
    fileType: 'js',
    fileName: 'js/main.js',
    elm: document.querySelector('.block-source--js'),
  });

  console.log('Thanks, world!');
})(window.licker);
