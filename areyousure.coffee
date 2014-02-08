$ = jQuery
namespace = "areyousure"
asAnchor = (text, action) ->
    return "<a href='#' class='#{namespace}-link' data-ays-action='#{action}'>#{text}</a>"
noop = ->
defaults =
    text: "Are you sure?"
    confirmText: 'Yes',
    cancelText: 'No',
    sep: " | ",
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
        @confirmElem = "<span class='areyousure-dialog' style='display:none' data-ays-dialog>
            <span class='areyousure-text'>#{text}</span></span>"
        @element.after(@confirmElem)
        @outer = @element.parent()
        @dialog = @outer.find("[data-ays-dialog]")
        @init()

    init: () ->
        self = this
        @element.on("click", (evt) ->
            evt.preventDefault()
            self.activate()
        )
        @outer.on('click', ".#{namespace}-link", (evt) ->
            evt.preventDefault()
            callback = if $(this).data('ays-action') == "confirm" then "yes" else "no"
            $.when(self.options[callback].call(self, evt)).then(() -> self.deactivate())
        )
        return this

    activate: () ->
        @dialog.show() and @element.hide()
        return this

    deactivate: () ->
        @dialog.hide() and @element.show()
        return this

$.fn.areyousure = (options) ->
    @each ->
        if !$.data(@, "plugin_#{namespace}")  # Prevent multiple instantiation
            $.data(@, "plugin_#{namespace}", new AreYouSure($(this), options))

AreYouSure.discover = () ->
    $("[data-areyousure]").each(() ->
        $this = $(this)
        new AreYouSure($this, {
            text: $this.data('areyousure') or defaults.text,
            confirmText: $this.data("confirm") or defaults.confirmText,
            cancelText: $this.data("cancel") or defaults.cancelText,
            reverse: $this.data("reversed")
        })
    )

window.AreYouSure = AreYouSure
AreYouSure.auto = true
$(() -> AreYouSure.discover() if AreYouSure.auto)
