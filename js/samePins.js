'use strict';

(function () {
  var cards = [];
  window.samePins = function () {
    var onSuccess = function (data) {
      cards = data;
      window.pin.setPins(cards);
    };
    window.load(onSuccess);
  };
})();
