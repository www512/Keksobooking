'use strict';

(function () {
  var typeOffers = document.getElementById('type');
  var price = document.getElementById('price');
  var timein = document.getElementById('timein');
  var timeout = document.getElementById('timeout');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var resetButton = document.querySelector('.ad-form__reset');
  var success = document.getElementById('success').content.querySelector('.success');
  var successTemplate = success.cloneNode(true);
  var adForm = document.querySelector('.ad-form');
  var bodyMain = document.querySelector('body');
  var pins = [];
  var RoomAndGuest = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var OffersMinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var onTypeOffersSelect = function () {
    if (typeOffers.value === 'bungalo') {
      price.setAttribute('min', OffersMinPrice.bungalo);
      price.setAttribute('placeholder', OffersMinPrice.bungalo);
    } else if (typeOffers.value === 'flat') {
      price.setAttribute('min', OffersMinPrice.flat);
      price.setAttribute('placeholder', OffersMinPrice.flat);
    } else if (typeOffers.value === 'house') {
      price.setAttribute('min', OffersMinPrice.house);
      price.setAttribute('placeholder', OffersMinPrice.house);
    } else if (typeOffers.value === 'palace') {
      price.setAttribute('min', OffersMinPrice.palace);
      price.setAttribute('placeholder', OffersMinPrice.palace);
    }
  };
  onTypeOffersSelect();
  typeOffers.addEventListener('change', onTypeOffersSelect);

  var onTimeIn = function (evt) {
    timeout.value = evt.target.value;
  };
  var onTimeOut = function (evt) {
    timein.value = evt.target.value;
  };
  timeout.addEventListener('change', onTimeOut);
  timein.addEventListener('change', onTimeIn);

  var onRoomNumberSelect = function (evt) {
    evt.target.setCustomValidity('');
    disableСapacity(roomNumber.value);
  };

  var onCapacitySelect = function (evt) {
    evt.target.setCustomValidity('');
  };

  var disableСapacity = function (inputRooms) {
    var capacityOptions = capacity.querySelectorAll('option');
    capacityOptions.forEach(function (it) {
      it.disabled = true;
    });
    RoomAndGuest[inputRooms].forEach(function (it) {
      capacity.querySelector('option' + '[value="' + it + '"]').disabled = false;
      capacity.value = it;
    });
  };

  roomNumber.addEventListener('change', onRoomNumberSelect);
  capacity.addEventListener('change', onCapacitySelect);

  var activatePage = function (adData) {
    pins = adData.slice(0);
    window.pin.reload(pins);
    disableСapacity(roomNumber.value);
    window.filter.filtrate(pins);
  };

  var resetPage = function () {
    window.map.offPageActive();
    window.pin.delete();
    window.card.remove();
  };

  var onResetButtonClick = function (evt) {
    evt.preventDefault();
    resetPage();
  };

  var onSuccessClick = function () {
    closeSuccess();
  };

  var onSuccessEsc = function (evt) {
    window.utils.onEscDown(evt, closeSuccess);
  };

  var closeSuccess = function () {
    bodyMain.removeChild(successTemplate);
    document.removeEventListener('keydown', onSuccessEsc);
    success.removeEventListener('click', onSuccessClick);
  };

  var showSuccess = function () {
    document.addEventListener('keydown', onSuccessEsc);
    successTemplate.addEventListener('click', onSuccessClick);
    bodyMain.appendChild(successTemplate);
  };

  var onSubmitSuccess = function () {
    showSuccess();
    resetPage();
  };

  var onSubmitError = function (errorMessage) {
    window.network.errorWindow(errorMessage);
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    var formData = new FormData(adForm);
    window.network.upload(onSubmitSuccess, onSubmitError, formData);
  };

  adForm.addEventListener('submit', onFormSubmit);
  resetButton.addEventListener('click', onResetButtonClick);

  window.form = {
    activatePage: activatePage
  };
})();
