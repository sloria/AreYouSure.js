(function() {
  var DLG, dlgContains, dlgNotVisible, dlgVisible, isNotVisible, isVisible, start, stop;

  isVisible = function(selector, msg) {
    return ok($(selector).is(':visible'), msg);
  };

  isNotVisible = function(selector, msg) {
    return ok(!$(selector).is(':visible'), msg);
  };

  dlgContains = function(id, text, msg) {
    var $dlg;
    $dlg = $("#" + id + " + .areyousure-dialog:contains('" + text + "')");
    return ok($dlg.length > 0, msg);
  };

  dlgVisible = function(id, msg) {
    return isVisible("#" + id + " + .areyousure-dialog");
  };

  dlgNotVisible = function(id, msg) {
    return isNotVisible("#" + id + " + .areyousure-dialog");
  };

  start = QUnit.start;

  stop = QUnit.stop;

  start();

  DLG = '[data-ays-dialog]';

  module('programmatic initialization');

  test('no config', function() {
    stop();
    $('#default').areyousure();
    dlgNotVisible('default');
    return Syn.click({}, 'default', function() {
      start();
      dlgVisible('default');
      dlgContains('default', 'Are you sure?');
      return dlgContains('default', 'Yes | No');
    });
  });

  test('custom text', function() {
    $("#customText").areyousure({
      text: "¿Está seguro?",
      confirmText: "Sí",
      cancelText: "No"
    });
    stop();
    return Syn.click({}, 'customText', function() {
      start();
      dlgVisible('customText');
      dlgContains('customText', "¿Está seguro?");
      dlgContains('customText', "Sí");
      return dlgContains('customText', "No");
    });
  });

  test('yes callback', function() {
    var yesCalled;
    expect(2);
    yesCalled = false;
    $("#callback").areyousure({
      yes: function() {
        return yesCalled = true;
      }
    });
    stop();
    return Syn.click({}, 'callback', function() {
      start();
      return dlgVisible('callback');
    }).click({}, $("#callback + .areyousure-dialog [data-ays-action='confirm']"), function() {
      return ok(yesCalled);
    });
  });

  test('no callback', function() {
    var noCalled;
    expect(2);
    noCalled = false;
    $("#callback").areyousure({
      no: function() {
        return noCalled = true;
      }
    });
    stop();
    return Syn.click({}, 'callback', function() {
      start();
      return dlgVisible('callback');
    }).click({}, $("#callback + .areyousure-dialog [data-ays-action='cancel']"), function() {
      return ok(noCalled);
    });
  });

  module('autodiscovered buttons', {
    setup: function() {
      return AreYouSure.discover();
    }
  });

  test('no config', function() {
    stop();
    dlgNotVisible('autoDefault');
    return Syn.click({}, 'autoDefault', function() {
      start();
      dlgVisible('autoDefault');
      dlgContains('autoDefault', 'Are you sure?');
      return dlgContains('autoDefault', 'Yes | No');
    });
  });

  test('custom text', function() {
    stop();
    return Syn.click({}, 'autoCustom', function() {
      start();
      dlgVisible('autoCustom');
      dlgContains('autoCustom', "¿Está seguro?");
      dlgContains('autoCustom', "Sí");
      return dlgContains('autoCustom', "No");
    });
  });

  test('reversed', function() {
    expect(1);
    stop();
    return Syn.click({}, 'autoReverse', function() {
      start();
      return dlgContains('autoReverse', 'No | Yes');
    });
  });

}).call(this);
