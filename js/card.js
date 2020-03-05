'use strict';

(function () {
  var card = document.getElementById('card').content.querySelector('.popup');
  window.fillOutCard = function (i) {
    window.load(function (anno) {
      var cardCopy = card.cloneNode(true);
      cardCopy.querySelector('.popup__title').textContent = anno[i].offer.title;
      cardCopy.querySelector('.popup__text--address').textContent = anno[i].offer.address;

      cardCopy.querySelector('.popup__text--price').textContent = anno[i].offer.price + ' ₽/ночь';
      if (anno[i].offer.type === 'flat') {
        cardCopy.querySelector('.popup__type').textContent = 'Квартира';
      } else if (anno[i].offer.type === 'bungalo') {
        cardCopy.querySelector('.popup__type').textContent = 'Бунгало';
      } else if (anno[i].offer.type === 'house') {
        cardCopy.querySelector('.popup__type').textContent = 'Дом';
      } else if (anno[i].offer.type === 'palace') {
        cardCopy.querySelector('.popup__type').textContent = 'Дворец';
      }
      cardCopy.querySelector('.popup__text--capacity').textContent = anno[i].offer.rooms + ' комнаты для ' + anno[i].offer.guests + ' гостей';
      cardCopy.querySelector('.popup__text--time').textContent = 'Заезд после ' + anno[i].offer.checkin + ', выезд до ' + anno[i].offer.checkout;
      var featuresList = cardCopy.querySelector('.popup__features');
      var featuresCard = cardCopy.querySelectorAll('.popup__feature');
      while (featuresList.firstChild) {
        featuresList.removeChild(featuresList.firstChild);
      }
      for (var j = 0; j < anno[i].offer.features.length; j++) {
        var featureClass = anno[i].offer.features[j];
        for (var k = 0; k < featuresCard.length; k++) {
          var featureCard = featuresCard[k];
          if (featureCard.classList.contains('popup__feature--' + featureClass)) {
            featuresList.appendChild(featureCard);
          }
        }
      }
      cardCopy.querySelector('.popup__description').textContent = anno[1].offer.description;
      for (var l = 0; l < anno[i].offer.photos.length; l++) {
        var photoBlock = cardCopy.querySelector('.popup__photos');
        var images = cardCopy.querySelector('.popup__photo');
        images.src = anno[i].offer.photos[l];
        var img = images.cloneNode(true);
        img.src = anno[i].offer.photos[l];
        photoBlock.appendChild(img);
      }
      cardCopy.querySelector('.popup__avatar').src = anno[i].author.avatar;
      return cardCopy;
    });
  };
})();
