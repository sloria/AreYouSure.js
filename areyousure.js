(function() {
  var $, AreYouSure, asAnchor, defaults, namespace, noop;

  $ = jQuery;

  namespace = "areyousure";

  asAnchor = function(text, action) {
    return "<a href='#' class='" + namespace + "-link' data-ays-action='" + action + "'>" + text + "</a>";
  };

  noop = function() {};

  defaults = {
    text: "Are you sure?",
    confirmText: asAnchor('Yes', 'confirm'),
    cancelText: asAnchor('No', 'cancel'),
    sep: " ",
    reverse: false,
    yes: noop,
    no: noop
  };

  AreYouSure = (function() {
    function AreYouSure(element, options) {
      var text;
      this.element = element;
      this.element.wrap("<span class='" + namespace + "'></span>");
      this.options = $.extend({}, defaults, options);
      this.cancelText = asAnchor(this.options.cancelText, 'cancel');
      this.confirmText = asAnchor(this.options.confirmText, 'confirm');
      if (this.options.reverse) {
        text = "" + this.options.text + this.options.sep + this.cancelText + this.options.sep + this.confirmText;
      } else {
        text = "" + this.options.text + this.options.sep + this.confirmText + this.options.sep + this.cancelText;
      }
      this.confirmElem = "<span class='areyousure' style='display:none' data-ays-dialog> <span class='areyousure-text'>" + text + "</span></span>";
      this.element.after(this.confirmElem);
      this.init();
    }

    AreYouSure.prototype.init = function() {
      var $dlg, $outer, self;
      self = this;
      $outer = this.element.parent();
      $dlg = $outer.find("[data-ays-dialog]");
      this.element.on("click", (function(_this) {
        return function(evt) {
          _this.element.hide();
          $dlg.show();
          return evt.preventDefault();
        };
      })(this));
      return $outer.on('click', "." + namespace + "-link", function(evt) {
        if ($(this).data('ays-action') === "confirm") {
          self.options.yes.call(self, evt);
        } else {
          self.options.no.call(self, evt);
        }
        $dlg.hide();
        return self.element.show();
      });
    };

    return AreYouSure;

  })();

  $.fn.areyousure = function(options) {
    return this.each(function() {
      if (!$.data(this, "plugin_" + namespace)) {
        return $.data(this, "plugin_" + namespace, new AreYouSure($(this), options));
      }
    });
  };

}).call(this);
