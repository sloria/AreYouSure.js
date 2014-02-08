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
    confirmText: 'Yes',
    cancelText: 'No',
    sep: "&nbsp;&nbsp;",
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
        text = "" + this.options.text + " " + this.cancelText + this.options.sep + this.confirmText;
      } else {
        text = "" + this.options.text + " " + this.confirmText + this.options.sep + this.cancelText;
      }
      this.confirmElem = "<span class='areyousure-dialog' style='display:none' data-ays-dialog> <span class='areyousure-text'>" + text + "</span></span>";
      this.element.after(this.confirmElem);
      this.outer = this.element.parent();
      this.dialog = this.outer.find("[data-ays-dialog]");
      this.init();
    }

    AreYouSure.prototype.init = function() {
      var self;
      self = this;
      this.element.on("click", function(evt) {
        evt.preventDefault();
        return self.activate();
      });
      this.outer.on('click', "." + namespace + "-link", function(evt) {
        var callback;
        evt.preventDefault();
        callback = $(this).data('ays-action') === "confirm" ? "yes" : "no";
        return $.when(self.options[callback].call(self, evt)).then(function() {
          return self.deactivate();
        });
      });
      return this;
    };

    AreYouSure.prototype.activate = function() {
      this.dialog.show() && this.element.hide();
      return this;
    };

    AreYouSure.prototype.deactivate = function() {
      this.dialog.hide() && this.element.show();
      return this;
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

  AreYouSure.discover = function() {
    return $("[data-areyousure]").each(function() {
      var $this;
      $this = $(this);
      return new AreYouSure($this, {
        text: $this.data('areyousure') || defaults.text,
        confirmText: $this.data("confirm") || defaults.confirmText,
        cancelText: $this.data("cancel") || defaults.cancelText,
        reverse: $this.data("reversed")
      });
    });
  };

  window.AreYouSure = AreYouSure;

  AreYouSure.auto = true;

  $(function() {
    if (AreYouSure.auto) {
      return AreYouSure.discover();
    }
  });

}).call(this);
