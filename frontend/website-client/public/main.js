( function() {
  var js = document.createElement('script');
  var css = document.createElement('link');
  var domain = getDomain();
  js.src = domain+'/%mainjs%';
  css.href = domain+'/%maincss%';
  css.rel='stylesheet'
  document.head.appendChild(css);
  document.body.appendChild(js);

  function getDomain() {
    var script = document.getElementById('cms-script');
    if(script) {
      //Temp element to utilise browser parsing capabilities
      var link = document.createElement('a');
      link.setAttribute('href', script.src);
      domain=link.protocol + '//' + link.hostname;
      if(link.port) {
        domain+=':'  + link.port;
      }
      link=null;
      return domain;
    } else {
      return '';
    }
  }

})();
