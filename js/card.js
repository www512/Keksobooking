'use strict';

(function () {

  var template = document.querySelector('template');
  var cardTemplate = template.content.querySelector('.map__card');
  var popupPhoto = template.content.querySelector('.popup__photo');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var HouseTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };

  var createCard = function (data) {
    removeOldCard();
    var renderingCard = cardTemplate.cloneNode(true);
    renderingCard.querySelector('.map__card img').src = data.author.avatar;
    renderingCard.querySelector('.popup__title').textContent = data.offer.title;
    renderingCard.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';
    renderingCard.querySelector('.popup__type').textContent = HouseTypes[data.offer.type];
    renderingCard.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    renderingCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    renderingCard.querySelector('.popup__features').innerHTML = '';
    renderingCard.querySelector('.popup__features').appendChild(createFacilities(data));
    renderingCard.querySelector('.popup__description').textContent = data.offer.description;
    renderingCard.querySelector('.popup__photos').removeChild(renderingCard.querySelector('.popup__photo'));
    renderingCard.querySelector('.popup__photos').appendChild(createPhotos(data));
    mapFiltersContainer.insertAdjacentElement('beforebegin', renderingCard);
    var closeCardBtn = renderingCard.querySelector('.popup__close');
    var closeCard = function () {
      window.pin.deleteActiveClass();
      renderingCard.remove();
      closeCardBtn.removeEventListener('click', onCloseCardBtn);
      document.removeEventListener('keydown', onCloseCardEsc);
    };
    var onCloseCardBtn = function () {
      closeCard();
    };
    closeCardBtn.addEventListener('click', onCloseCardBtn);
    var onCloseCardEsc = function (evt) {
      window.utils.onEscDown(evt, closeCard);
    };
    document.addEventListener('keydown', onCloseCardEsc);
    return renderingCard;
  };

  var removeOldCard = function () {
    var cardDelete = map.querySelector('.map__card');
    if (cardDelete) {
      cardDelete.remove();
    }
  };

  var createFacilities = function (data) {
    var facilities = document.createDocumentFragment();
    data.offer.features.forEach(function (it) {
      var facilitiesItem = document.createElement('li');
      facilitiesItem.className = 'popup__feature popup__feature--' + it;
      facilities.appendChild(facilitiesItem);
    });
    return facilities;
  };

  var createPhotos = function (data) {
    var photos = document.createDocumentFragment();
    data.offer.photos.forEach(function (it) {
      var photoItem = popupPhoto.cloneNode(true);
      photoItem.src = it;
      photos.appendChild(photoItem);
    });
    return photos;
  };

  window.card = {
    create: createCard,
    remove: removeOldCard
  };
})();
