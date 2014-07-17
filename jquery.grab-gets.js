/*!
 * jQuery grabget plugin
 * Description: Grab GET parameters from url and put, select and check elements of selected form
 * version: 1.1.2-2014.17.07
 * Requires jQuery v1.2 or later
 * Autor: saxa:p (http://dontforget.pro)
 * Examples and documentation at: http://malsup.com/jquery/form/
 * Project repository: https://github.com/malsup/form
 * Dual licensed under the MIT and GPL licenses.
 * https://github.com/malsup/form#copyright-and-license
 */
(function($){
  jQuery.fn.grabgets = function(options){
    options = $.extend({
      hidden: true
    }, options);
    $.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        var h0,h1;
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          h0 = decodeURIComponent(hash[0]).replace(/\+/g, ' ');
          h1 = (hash[1] ? decodeURIComponent(hash[1].replace(/\+/g, ' ')) : hash[1]);
          if (vars[h0]) { 
            if (!$.isArray(vars[h0])) vars[h0] = [vars[h0]];
            vars[h0].push(h1);
          } else {
            vars[h0] = h1;
          }
        }
        return vars;
      }
    });
    var form = $(this);
    var make = function(){
      var arr = $.getUrlVars();
      if (form.length != 0) {
        form.find('input[type="text"]').each( function() {
          var iname = $(this).attr('name');
          var ival  = arr[iname];
          if (ival) {
            $(this).val(ival);
          }
        });
        if ( options.hidden ) {
            form.find('input[type="hidden"]').each( function() {
            var iname = $(this).attr('name');
            var ival  = arr[iname];
            if (ival) {
              $(this).val(ival);
            }
        });
        }
        form.find('textarea').each( function() {
          var iname = $(this).attr('name');
          var ival  = arr[iname];
          if (ival) {
            $(this).html(ival);
          }
        });
        form.find('select').each( function() {
          var iname = $(this).attr('name');
          $(this).find('option').each( function() {
           var ival = $(this).val();
            if ( arr[iname] == ival || $.inArray(ival, arr[iname]) != -1 ) {
              $(this).prop('selected', true)
            }
          });
        });
        form.find('input[type="checkbox"], input[type="radio"]').each( function() {
          var iname = $(this).attr('name');
          var ival = $(this).val();
          if ( arr[iname] == ival || $.inArray(ival, arr[iname]) != -1 ) {
            $(this).attr('checked', 'checked');
          }
        });
      };
    };
  return form.each(make); 
  };
})(jQuery);