import $ from 'jquery'
import _ from 'lodash'

class Egul {
  constructor(opts = {}) {
    this.template = opts.template ||
`<div class="code-frame">
  <div class="code-lang"><%= fileType %><%= (fileType && fileName) ? ':' : '' %><%= fileName %></div>
  <div class="highlight">
    <pre><code></code></pre>
  </div>
</div>`;
    this.compiled = _.template(this.template);
  }

  renderDom() {
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
      fileType: 'html',
      fileName: '',
    });
    var $child = $(child);
    $child.find('code').text(htmlTxt);
    $('.block-source--dom').append($child);
  }

  renderAsset(opts = {}) {
    var elm = opts.elm;
    var fileName = opts.fileName || '';
    var fileType = opts.fileType || '';

    var $elm;

    if(elm instanceof HTMLElement) {
      $elm = $(elm);
    } else {
      $elm = elm;
    }

    $.ajax({
      url: fileName,
      dataType: 'text',
      success: (res) => {
        var srcTxt = res;

        var child = this.compiled({
          fileName: fileName,
          fileType: fileType,
        });
        var $child = $(child);
        $child.find('code').text(srcTxt);
        $elm.append($child);
      }
    });
  }
}

window.Egul = Egul;
module.exports = Egul;
