'use strict';
var ESC_KEY = 27;
var ENTER_KEY = 'Enter';

var getRandom = function (parametr) {
  var randomNumber = Math.floor(Math.random() * Math.floor(parametr));
  return randomNumber;
};

var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (arr) {
  var randomArray = [];
  for (var i = 0; i < window.util.getRandom(arr.length); i++) {
    randomArray[i] = arr[window.util.getRandom(arr.length)];
  }
  return randomArray;
};

var isEnterEvent = function (evt, action) {
  if (evt.keyCode === ENTER_KEY) {
    action();
  }
};

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEY) {
    action();
  }
};

var setDisabled = function (arr) {
  for (var t = 0; t < arr.length; t++) {
    arr[t].setAttribute('disabled', 'disabled');
  }
};

var removeDisabled = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
};

window.util = {
  getRandom: getRandom,
  getRandomIntInclusive: getRandomIntInclusive,
  getRandomArray: getRandomArray,
  isEnterEvent: isEnterEvent,
  isEscEvent: isEscEvent,
  setDisabled: setDisabled,
  removeDisabled: removeDisabled
};
