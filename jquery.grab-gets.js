/*!
 * jQuery grabget plugin
 * Description: Grab GET parameters from url and put, select and check elements of selected form
 * version: 1.3-2016.03.22
 * Requires jQuery v1.6 or later
 * Autor: saxa:p (http://dontforget.pro)
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
        form.find('input[type="text"], input[type="number"], input[type="date"], input[type="color"], input[type="range"], input[type="month"], input[type="week"], input[type="time"], input[type="datetime"], input[type="datetime-local"], input[type="email"], input[type="search"], input[type="tel"], input[type="url"]').each( function() {
          var iname = $(this).attr('name');
          var ival  = arr[iname];
          if ($.isArray(ival)) ival = ival[form.find('input[name="'+iname+'"]').index($(this))];
          if (ival) {
            $(this).val(ival);
          }
        });
        if ( options.hidden ) {
            form.find('input[type="hidden"]').each( function() {
            var iname = $(this).attr('name');
            var ival  = arr[iname];
            if ($.isArray(ival)) ival = ival[form.find('input[type="hidden"][name="'+iname+'"]').index($(this))];
            if (ival) {
              $(this).val(ival);
            }
        });
        }
        form.find('textarea').each( function() {
          var iname = $(this).attr('name');
          var ival  = arr[iname];
          if ($.isArray(ival)) ival = ival[form.find('textarea[name="'+iname+'"]').index($(this))];
          if (ival) {
            $(this).html(ival);
          }
        });
        form.find('select').each( function() {
          var iname = $(this).attr('name');
          var vals = arr[iname];
          if ($.isArray(vals) && !$(this).attr('multiple')) vals = vals[form.find('select[name="'+iname+'"]').index($(this))]; // if we have arr of vals - we need get element with index = index of select with same name
          $(this).find('option').each( function() {
            var ival = $(this).val();
            if ( vals == ival || $.inArray(ival, vals) != -1 ) {
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