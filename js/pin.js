'use strict';
(function () {

  var map = document.querySelector('.map');
  var OFFSET = 20;
  var mapPins = document.querySelector('.map__pins');
  var pin = document.getElementById('pin').content.querySelector('.map__pin');
  var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  var pinCopy = pin.cloneNode(true);
  var mapCard = map.querySelector('.map__card');
  var removeOldPins = function () {
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var r = 0; r < pins.length; r++) {
      if (pins[0]) {
        mapPins.removeChild(pins[r]);
      }
    }
  };
  var removeCard = function () {
    if (mapCard) {
      map.removeChild(mapCard);
    }
  };

  var setPins = function (data) {
    mapCard = map.querySelector('.map__card');
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinsQuatity = data.length;
    if (data.length > 5) {
      pinsQuatity = 5;
    }
    removeCard();
    removeOldPins();
    for (var i = 0; i < pinsQuatity; i++) {
      pinCopy = pin.cloneNode(true);
      var avatar = pin.querySelector('img');
      var Left = data[i].location.x + OFFSET;
      var Top = data[i].location.y + OFFSET;
      pinCopy.style.left = Left + 'px';
      pinCopy.style.top = Top + 'px';
      avatar.src = data[i].author.avatar;
      avatar.alt = data[i].offer.title;
      mapPins.appendChild(pinCopy);
    }
    var insertCard = function (t) {
      map.appendChild(window.fillOutCard(t, data));
    };
    var onPinClick = function (pinCop, j) {
      pinCop.addEventListener('click', function () {
        mapCard = map.querySelector('.map__card');
        var pinActive = map.querySelector('.map__pin--active');
        pinCop.classList.add('map__pin--active');
        if (mapCard) {
          removeCard();
        }
        if (pinActive) {
          pinActive.classList.remove('map__pin--active');
        }
        insertCard(j);
        mapCard = map.querySelector('.map__card');
        var cardClose = document.querySelector('.popup__close');
        cardClose.addEventListener('click', function () {
          map.removeChild(mapCard);
          pinCop.classList.remove('map__pin--active');
        });
        document.addEventListener('keydown', function (evt) {
          if (evt.keyCode === 27) {
            map.removeChild(mapCard);
            pinCop.classList.remove('map__pin--active');
          }
        });
      });
    };
    pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      onPinClick(pins[j], j);
    }
  };

  window.pin = {
    setPins: setPins,
    removeOldPins: removeOldPins,
    removeCard: removeCard
  };
})();
