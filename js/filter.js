'use strict';

(function () {

  var typeOffer = document.getElementById('housing-type');
  var priceOffer = document.getElementById('housing-price');
  var roomsOffer = document.getElementById('housing-rooms');
  var guestsOffer = document.getElementById('housing-guests');
  var featuresOffer = document.getElementById('housing-features');
  var filterPins = [];
  var enabledFilters = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
    features: []
  };
  var PriceOffers = {
    low: {
      max: 10000
    },
    middle: {
      min: 10000,
      max: 50000
    },
    high: {
      min: 50000
    }
  };

  var filtrate = function (pins) {

    var filterTypes = function (evt) {
      enabledFilters.type = evt.target.value;
      onFilterOffers(pins);
    };

    var filterByTypes = function (it) {
      return enabledFilters.type === 'any' || it.offer.type === enabledFilters.type;
    };

    var filterPrice = function (evt) {
      enabledFilters.price = evt.target.value;
      onFilterOffers(pins);
    };

    var filterByPrice = function (it) {
      if (enabledFilters.price === 'any') {
        return true;
      }
      switch (enabledFilters.price) {
        case 'low':
          return (it.offer.price < PriceOffers.low.max);
        case 'middle':
          return ((it.offer.price <= PriceOffers.middle.max) && (it.offer.price >= PriceOffers.middle.min));
        case 'high':
          return (it.offer.price > PriceOffers.high.min);
        default:
          return true;
      }
    };

    var filterRooms = function (evt) {
      enabledFilters.rooms = evt.target.value;
      onFilterOffers(pins);
    };

    var filterByRooms = function (it) {
      return enabledFilters.rooms === 'any' || it.offer.rooms === +enabledFilters.rooms;
    };

    var filterGuests = function (evt) {
      enabledFilters.guests = evt.target.value;
      onFilterOffers(pins);
    };

    var filterByGuests = function (it) {
      return enabledFilters.guests === 'any' || it.offer.guests === +enabledFilters.guests;
    };

    var filterFeatures = function () {
      onFilterOffers(pins);
    };

    var filterByFeatures = function (it) {
      var checkedFeaturesItems = featuresOffer.querySelectorAll('input:checked');
      return Array.from(checkedFeaturesItems).every(function (element) {
        return it.offer.features.includes(element.value);
      });
    };

    var onFilterOffers = window.utils.debounce(function (it) {
      window.card.remove();
      filterPins = it.slice(0);
      filterPins = filterPins.filter(filterByTypes).filter(filterByPrice).filter(filterByRooms).filter(filterByGuests).filter(filterByFeatures);
      window.pin.reload(filterPins);
    });

    typeOffer.addEventListener('change', filterTypes);
    priceOffer.addEventListener('change', filterPrice);
    roomsOffer.addEventListener('change', filterRooms);
    guestsOffer.addEventListener('change', filterGuests);
    featuresOffer.addEventListener('change', filterFeatures);
  };

  window.filter = {
    filtrate: filtrate
  };
})();
