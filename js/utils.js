'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var DEBOUNCE_TIME = 500;

  var onEscDown = function (evt, close) {
    if (evt.keyCode === ESC_KEYCODE) {
      close();
    }
  };

  var debounce = function (fun) {
    var lastTimeout = null;
    return function () {
      var args = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        fun.apply(null, args);
      }, DEBOUNCE_TIME);
    };
  };

  window.utils = {
    onEscDown: onEscDown,
    debounce: debounce
  };

})();
