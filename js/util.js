'use strict';

window.util = (function () {
  var ESC_KEY = 27;
  var ENTER_KEY = 'Enter';
  return {
    getRandom: function (parametr) {
      var randomNumber = Math.floor(Math.random() * Math.floor(parametr));
      return randomNumber;
    },
    getRandomIntInclusive: function (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    getRandomArray: function (arr) {
      var randomArray = [];
      for (var i = 0; i < window.util.getRandom(arr.length); i++) {
        randomArray[i] = arr[window.util.getRandom(arr.length)];
      }
      return randomArray;
    },
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEY) {
        action();
      }
    },
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEY) {
        action();
      }
    },
    setDisabled: function (arr) {
      for (var t = 0; t < arr.length; t++) {
        arr[t].setAttribute('disabled', 'disabled');
      }
    },
    removeDisabled: function (arr) {
      for (var t = 0; t < arr.length; t++) {
        arr[t].removeAttribute('disabled');
      }
    },
  };
})();
