
isVisible = (selector, msg) -> ok($(selector).is(':visible'), msg)
isNotVisible = (selector, msg) -> ok(!$(selector).is(':visible'), msg)
dlgContains = (id, text, msg) ->
    $dlg = $("##{id} + .areyousure-dialog:contains('#{text}')")
    ok($dlg.length > 0, msg)

dlgVisible = (id, msg) ->
    isVisible("##{id} + .areyousure-dialog")

dlgNotVisible = (id, msg) ->
    isNotVisible("##{id} + .areyousure-dialog")


start = QUnit.start
stop = QUnit.stop
start()

DLG = '[data-ays-dialog]'  # Selector for dialog

module('programmatic initialization')

test('no config', ->
    stop()
    $('#default').areyousure()
    dlgNotVisible('default')
    Syn.click({}, 'default', () ->
        start()
        dlgVisible('default')
        dlgContains('default', 'Are you sure?')
        dlgContains('default', 'Yes | No')
    )
)

test('custom text', ->
    $("#customText").areyousure({
        text: "¿Está seguro?", confirmText: "Sí", cancelText: "No"})
    stop()
    Syn.click({}, 'customText', ->
        start()
        dlgVisible('customText')
        dlgContains('customText', "¿Está seguro?")
        dlgContains('customText', "Sí")
        dlgContains('customText', "No")
    )
)

test('custom separator', ->
    stop()
    $('#default').areyousure({sep: ' / '})
    Syn.click({}, 'default', () ->
        start()
        dlgContains('default', 'Yes / No')
    )
)

test('yes callback', ->
    expect(2)
    yesCalled = false
    $("#callback").areyousure({
        yes: () -> yesCalled = true,
    })
    stop()
    Syn.click({}, 'callback', ->
        start()
        dlgVisible('callback')
    )
    .click({}, $("#callback + .areyousure-dialog [data-ays-action='confirm']"), ->
        ok(yesCalled)
    )
)

test('no callback', ->
    expect(2)
    noCalled = false
    $("#callback").areyousure({
        no: () -> noCalled = true,
    })
    stop()
    Syn.click({}, 'callback', ->
        start()
        dlgVisible('callback')
    )
    .click({}, $("#callback + .areyousure-dialog [data-ays-action='cancel']"), ->
        ok(noCalled)
    )
)

test('additional links', ->
    $('#default').areyousure({additional: ['Foo', 'Bar']})
    stop()
    Syn.click({}, 'default', ->
        start()
        dlgVisible('default')
        dlgContains('default', 'Yes | No | Foo | Bar')
    )

)

module('autodiscovered buttons',
    setup: () -> AreYouSure.discover()
)

test('no config', ->
    stop()
    dlgNotVisible('autoDefault')
    Syn.click({}, 'autoDefault', () ->
        start()
        dlgVisible('autoDefault')
        dlgContains('autoDefault', 'Are you sure?')
        dlgContains('autoDefault', 'Yes | No')
    )
)

test('custom text', ->
    stop()
    Syn.click({}, 'autoCustom', ->
        start()
        dlgVisible('autoCustom')
        dlgContains('autoCustom', "¿Está seguro?")
        dlgContains('autoCustom', "Sí")
        dlgContains('autoCustom', "No")
    )
)

test('custom separator', ->
    stop()
    Syn.click({}, 'autoSep', ->
        start()
        dlgVisible('autoSep')
        dlgContains('autoSep', 'Yes / No')
    )
)

test('reversed', ->
    expect(1)
    stop()
    Syn.click({}, 'autoReverse', ->
        start()
        dlgContains('autoReverse', 'No | Yes')
    )
)
