'use strict';

var setPins = function () {
  var OFFSET = 20;
  var mapPins = document.querySelector('.map__pins');
  var pin = document.getElementById('pin').content.querySelector('.map__pin');
  for (var i = 0; i < window.getArrayOfAnnouncements.length; i++) {
    var pinCopy = pin.cloneNode(true);
    var avatar = pin.querySelector('img');
    var Left = window.getArrayOfAnnouncements[i].location.x + OFFSET;
    var Top = window.getArrayOfAnnouncements[i].location.y + OFFSET;
    pinCopy.style.left = Left + 'px';
    pinCopy.style.top = Top + 'px';
    avatar.src = window.getArrayOfAnnouncements[i].author.avatar;
    avatar.alt = window.getArrayOfAnnouncements[i].offer.title;
    mapPins.appendChild(pinCopy);
  }
};


window.pin = {
  setPins: setPins,
};
