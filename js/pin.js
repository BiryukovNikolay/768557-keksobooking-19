'use strict';

var setPins = function () {
  var map = document.querySelector('.map');
  window.load(function (anno) {
    var OFFSET = 20;
    var mapPins = document.querySelector('.map__pins');
    var pin = document.getElementById('pin').content.querySelector('.map__pin');
    for (var i = 0; i < anno.length; i++) {
      var pinCopy = pin.cloneNode(true);
      var avatar = pin.querySelector('img');
      var Left = anno[i].location.x + OFFSET;
      var Top = anno[i].location.y + OFFSET;
      pinCopy.style.left = Left + 'px';
      pinCopy.style.top = Top + 'px';
      avatar.src = anno[i].author.avatar;
      avatar.alt = anno[i].offer.title;
      mapPins.appendChild(pinCopy);
    }
    var insertCard = function (t) {
      map.appendChild(window.fillOutCard(t));
    };
    var onPinClick = function (pinCop, j) {
      pinCop.addEventListener('click', function () {
        var mapCard = map.querySelector('.map__card');
        var pinActive = map.querySelector('.map__pin--active');
        pinCop.classList.add('map__pin--active');
        if (mapCard) {
          map.removeChild(mapCard);
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
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < pins.length; j++) {
      onPinClick(pins[j], j);
    }
  }
  );
};

window.pin = {
  setPins: setPins,
};
