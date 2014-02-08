$ = jQuery
namespace = "areyousure"
asAnchor = (text, action) ->
    return "<a href='#' class='#{namespace}-link' data-ays-action='#{action}'>#{text}</a>"
noop = ->
defaults =
    text: "Are you sure?"
    confirmText: 'Yes',
    cancelText: 'No',
    sep: "&nbsp;&nbsp;",
    reverse: false,
    yes: noop, no: noop

class AreYouSure
    constructor: (@element, options) ->
        @element.wrap("<span class='#{namespace}'></span>")
        @options = $.extend({}, defaults, options)
        @cancelText = asAnchor(@options.cancelText, 'cancel')
        @confirmText = asAnchor(@options.confirmText, 'confirm')
        if @options.reverse
            text = "#{@options.text} #{@cancelText}#{@options.sep}#{@confirmText}"
        else
            text = "#{@options.text} #{@confirmText}#{@options.sep}#{@cancelText}"
        @confirmElem = "<span class='areyousure' style='display:none' data-ays-dialog>
            <span class='areyousure-text'>#{text}</span></span>"
        @element.after(@confirmElem)
        @outer = @element.parent()
        @dialog = @outer.find("[data-ays-dialog]")
        @init()

    init: () ->
        self = this
        @element.on("click", (evt) =>
            @activate()
            evt.preventDefault()
        )
        @outer.on('click', ".#{namespace}-link", (evt) ->
            self.deactivate()
            if $(this).data('ays-action') == "confirm"
                self.options.yes.call(self, evt)
            else
                self.options.no.call(self, evt)
        )
        return this

    activate: () ->
        @dialog.show()
        @element.hide()
        return this

    deactivate: () ->
        @dialog.hide()
        @element.show()
        return this

$.fn.areyousure = (options) ->
    @each ->
        if !$.data(@, "plugin_#{namespace}")
            $.data(@, "plugin_#{namespace}", new AreYouSure($(this), options))

AreYouSure.discover = () ->
    $("[data-areyousure]").each(() ->
        $this = $(this)
        new AreYouSure($this, {
            text: $this.data('areyousure') or defaults.text,
            confirmText: $this.data("confirm") or defaults.confirmText,
            cancelText: $this.data("cancel") or defaults.cancelText
        })
    )

window.AreYouSure = AreYouSure
AreYouSure.auto = true
$(() -> AreYouSure.discover() if AreYouSure.auto)
