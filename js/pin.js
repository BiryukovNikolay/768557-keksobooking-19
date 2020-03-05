'use strict';

var setPins = function () {
  window.load(function (anno) {
    var OFFSET = 20;
    var mapPins = document.querySelector('.map__pins');
    var pin = document.getElementById('pin').content.querySelector('.map__pin');
    for (var i = 0; i < 8; i++) {
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
  }
  );
};

window.pin = {
  setPins: setPins,
};
