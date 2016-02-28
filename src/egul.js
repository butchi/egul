import $ from 'jquery'

class Egul {
  constructor() {
    this.$codeFrame = $('<div class="code-frame"></div>');
    this.$codeLang = $('<div class="code-lang"></div>');
    this.$highlight = $('<div class="highlight"></div>');
    this.$preCode = $('<pre><code></code></pre>');
  }

  renderHtml () {
    var htmlTxt = _.template(
      '<html>\n' +
      '  <head>' +
      '<%= head %>\n' +
      '  </head>\n' +
      '  <body>' +
      '<%= body %>\n' +
      '  </body>\n' +
      '</html>'
    )({
      head: $('head').html().replace(/\s+$/, '').replace(/\n/g, '\n  '),
      body: $('body').html().replace(/\s+$/, '').replace(/\n/g, '\n  ')
    });

    var $frame = this.$codeFrame.clone();
    var $hl = this.$highlight.clone();
    var $lang = (this.$codeLang.clone().text('index.html'))
    var $code = this.$preCode.clone().text(htmlTxt);
    $hl.append($code);
    $frame.append($lang).append($hl);
    $('.block-source--html').append($frame);
  }

  renderAssets (fileArr) {
    var $blockSrc = $('.block-source--list');
    fileArr.forEach((fileName) => {
      $.ajax({
        url: fileName,
        dataType: 'text',
        success: (res) => {
          var srcTxt = res;

          var $frame = this.$codeFrame.clone();
          var $hl = this.$highlight.clone();
          var $lang = (this.$codeLang.clone().text(fileName))
          var $code = this.$preCode.clone().text(srcTxt);
          $hl.append($code);
          $frame.append($lang).append($hl);
          $blockSrc.append($frame);
        }
      });
    });
  }
}

window.Egul = Egul;
module.exports = Egul;
