/*!
 * jQuery grabget plugin
 * Description: Grab GET parameters from url and put, select and check elements of selected form
 * version: 1.0.4-2013.22.12
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
      getUrlVars: function(re){
        var vars = [], hash;
        var h0 = '';
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          h0 = hash[0];
          if (!re) {
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
          } else {            
          vars[decodeURIComponent(hash[1])] = decodeURIComponent(h0);
          }
        }
        return vars;
      },
      getUrlVar: function(name){
        name = encodeURIComponent(name);
        return $.getUrlVars()[name];
      }
    });
    var form = $(this);
    var make = function(){
      if (form.length != 0) {
        form.find('input[type="text"]').each( function() {
          var iname = $(this).attr('name');
          var ival  = $.getUrlVar(iname);
          if (ival) {
            ival = decodeURIComponent(ival);
            $(this).val(ival);
          }
        });
        if ( options.hidden ) {
            form.find('input[type="hidden"]').each( function() {
            var iname = $(this).attr('name');
            var ival  = $.getUrlVar(iname);
            if (ival) {
              ival = decodeURIComponent(ival);
              $(this).val(ival);
            }
        });
        }
        form.find('textarea').each( function() {
          var iname = $(this).attr('name');
          var ival  = $.getUrlVar(iname);
          if (ival) {
            ival = decodeURIComponent(ival);
            $(this).html(ival);
          }
        });
        var arr = $.getUrlVars('1');
        form.find('select').each( function() {
          var iname = $(this).attr('name');
          $(this).find('option').each( function() {
           var ival = $(this).val();
            if ( arr[ival] == iname ) {
              $(this).attr('selected', 'selected');
            }
          });
        });
        form.find('input[type="checkbox"], input[type="radio"]').each( function() {
          var iname = $(this).attr('name');
          var ival = $(this).val();
          if ( arr[ival] == iname ) {
            $(this).attr('checked', 'checked');
          }
        });
      };
    };
  return form.each(make); 
  };
})(jQuery);
