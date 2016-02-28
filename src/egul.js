import $ from 'jquery'
import _ from 'lodash'

class Egul {
  constructor(opts = {}) {
    this.template = opts.template ||
`<div class="code-frame">
  <div class="code-lang"><%= fileName %></div>
  <div class="highlight">
    <pre><code></code></pre>
  </div>
</div>`;
    this.compiled = _.template(this.template);
  }

  renderHtml() {
    var htmlTxt = _.template(
`<html>
  <head>
    <%= head %>
  </head>
  <body>
    <%= body %>
  </body>
</html>`
    )({
      head: $('head').html().replace(/\s+$/, '').replace(/\n/g, '\n  '),
      body: $('body').html().replace(/\s+$/, '').replace(/\n/g, '\n  ')
    });

    var child = this.compiled({
      fileName: 'index.html',
    });
    var $child = $(child);
    $child.find('code').text(htmlTxt);
    $('.block-source--html').append($child);
  }

  getSource(fileName) {
    $.ajax({
      url: fileName,
      dataType: 'text',
      success: (res) => {
        var srcTxt = res;

        var child = this.compiled({
          fileName: fileName,
        });
        var $child = $(child);
        $child.find('code').text(srcTxt);
        window.$blockSrc.append($child);
      }
    });
  }

  renderAssets(fileArr) {
    window.$blockSrc = $('.block-source--list');
    fileArr.forEach((fileName) => {
      this.getSource(fileName);
    });
  }
}

window.Egul = Egul;
module.exports = Egul;
