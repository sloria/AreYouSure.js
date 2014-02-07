$ = jQuery
namespace = "areyousure"
asAnchor = (text, action) ->
    return "<a href='#' class='#{namespace}-link' data-ays-action='#{action}'>#{text}</a>"
noop = ->
defaults =
    text: "Are you sure?"
    confirmText: asAnchor('Yes', 'confirm'),
    cancelText: asAnchor('No', 'cancel'),
    sep: " ",
    reverse: false,
    yes: noop, no: noop

class AreYouSure
    constructor: (@element, options) ->
        @element.wrap("<span class='#{namespace}'></span>")
        @options = $.extend({}, defaults, options)
        @cancelText = asAnchor(@options.cancelText, 'cancel')
        @confirmText = asAnchor(@options.confirmText, 'confirm')
        if @options.reverse
            text = "#{@options.text}#{@options.sep}#{@cancelText}#{@options.sep}#{@confirmText}"
        else
            text = "#{@options.text}#{@options.sep}#{@confirmText}#{@options.sep}#{@cancelText}"
        @confirmElem = "<span class='areyousure' style='display:none' data-ays-dialog>
            <span class='areyousure-text'>#{text}</span></span>"
        @element.after(@confirmElem)
        @init()

    init: ->
        self = this
        $outer = @element.parent()
        $dlg = $outer.find("[data-ays-dialog]")
        @element.on("click", (evt) =>
            @element.hide()
            $dlg.show()
            evt.preventDefault()
        )
        $outer.on('click', ".#{namespace}-link", (evt) ->
            if $(this).data('ays-action') == "confirm"
                self.options.yes.call(self, evt)
            else
                self.options.no.call(self, evt)
            $dlg.hide()
            self.element.show()
        )


$.fn.areyousure = (options) ->
    @each ->
        if !$.data(@, "plugin_#{namespace}")
            $.data(@, "plugin_#{namespace}", new AreYouSure($(this), options))
