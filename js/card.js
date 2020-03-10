'use strict';

(function () {
  window.fillOutCard = function (i) {
    var card = document.getElementById('card').content.querySelector('.popup');
    var cardCopy = card.cloneNode(true);
    var featuresList = cardCopy.querySelector('.popup__features');
    var featuresCard = cardCopy.querySelectorAll('.popup__feature');
    var fillTitle = function (data) {
      cardCopy.querySelector('.popup__title').textContent = data[i].offer.title;
    };
    var fillAddress = function (data) {
      cardCopy.querySelector('.popup__text--address').textContent = data[i].offer.address;
    };
    var fillType = function (data) {
      cardCopy.querySelector('.popup__text--price').textContent = data[i].offer.price + ' ₽/ночь';
      if (data[i].offer.type === 'flat') {
        cardCopy.querySelector('.popup__type').textContent = 'Квартира';
      } else if (data[i].offer.type === 'bungalo') {
        cardCopy.querySelector('.popup__type').textContent = 'Бунгало';
      } else if (data[i].offer.type === 'house') {
        cardCopy.querySelector('.popup__type').textContent = 'Дом';
      } else if (data[i].offer.type === 'palace') {
        cardCopy.querySelector('.popup__type').textContent = 'Дворец';
      }
    };
    var fillGuests = function (data) {
      cardCopy.querySelector('.popup__text--capacity').textContent = data[i].offer.rooms + ' комнаты для ' + data[i].offer.guests + ' гостей';
    };
    var fillcheckin = function (data) {
      cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + data[i].offer.checkin + ', выезд до ' + data[i].offer.checkout;
    };
    var fillFeaturesList = function (data) {
      while (featuresList.firstChild) {
        featuresList.removeChild(featuresList.firstChild);
      }
      for (var j = 0; j < data[i].offer.features.length; j++) {
        var featureClass = data[i].offer.features[j];
        for (var k = 0; k < featuresCard.length; k++) {
          var featureCard = featuresCard[k];
          if (featureCard.classList.contains('popup__feature--' + featureClass)) {
            featuresList.appendChild(featureCard);
          }
        }
      }
    };
    var fillDescription = function (data) {
      cardCopy.querySelector('.popup__description').textContent = data[1].offer.description;
      for (var l = 0; l < data[i].offer.photos.length; l++) {
        var photoBlock = cardCopy.querySelector('.popup__photos');
        var images = cardCopy.querySelector('.popup__photo');
        images.src = data[i].offer.photos[l];
        var img = images.cloneNode(true);
        img.src = data[i].offer.photos[l];
        photoBlock.appendChild(img);
      }
    };
    var fillAvatar = function (data) {
      cardCopy.querySelector('.popup__avatar').src = data[i].author.avatar;
    };
    window.load(function (anno) {
      fillTitle(anno);
      fillAddress(anno);
      fillType(anno);
      fillGuests(anno);
      fillcheckin(anno);
      fillFeaturesList(anno);
      fillDescription(anno);
      fillAvatar(anno);
    });
    return cardCopy;
  };
})();
