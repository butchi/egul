window.licker = window.licker || {};
(function (ns, $) {
  'use strict';

  $(function () {
    (function getSource() {
      var $codeFrame = $('<div class="code-frame"></div>');
      var $codeLang = $('<div class="code-lang"></div>');
      var $highlight = $('<div class="highlight"></div>');
      var $preCode = $('<pre><code></code></pre>');

      function renderHtml() {
        var htmlTxt = _.template('<html>\n' + '  <head>' + '<%= head %>\n' + '  </head>\n' + '  <body>' + '<%= body %>\n' + '  </body>\n' + '</html>')({
          head: $('head').html().replace(/\s+$/, '').replace(/\n/g, '\n  '),
          body: $('body').html().replace(/\s+$/, '').replace(/\n/g, '\n  ')
        });

        var $frame = $codeFrame.clone();
        var $hl = $highlight.clone();
        var $lang = $codeLang.clone().text('index.html');
        var $code = $preCode.clone().text(htmlTxt);
        $hl.append($code);
        $frame.append($lang).append($hl);
        $('.block-source--html').append($frame);
      }

      function renderAssets(fileArr) {

        var $blockSrc = $('.block-source--list');
        fileArr.forEach(function (fileName) {
          $.ajax({
            url: fileName,
            dataType: 'text',
            success: function (res) {
              var srcTxt = res;

              var $frame = $codeFrame.clone();
              var $hl = $highlight.clone();
              var $lang = $codeLang.clone().text(fileName);
              var $code = $preCode.clone().text(srcTxt);
              $hl.append($code);
              $frame.append($lang).append($hl);
              $blockSrc.append($frame);
            }
          });
        });
      }

      renderHtml();

      renderAssets(['css/style.css', 'js/main.js']);
    })();
  });
})(window.licker, window.jQuery);