'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = 'img/muffin-grey.svg';
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var imagesContainer = document.querySelector('.ad-form__photo-container');
  var avatarChooser = document.getElementById('avatar');
  var imageChooser = document.getElementById('images');
  var ImageParams = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  var hasCorrectType = function (file) {
    return FILE_TYPES.some(function (it) {
      return file.name.toLowerCase().endsWith(it);
    });
  };

  var changeAvatar = function (src) {
    avatarPreview.src = src;
  };

  var removeEmptyImgWrap = function () {
    var emptyImgWrap = document.querySelector('.ad-form__photo--empty');
    if (emptyImgWrap) {
      emptyImgWrap.remove();
    }
  };

  var addImages = function (src) {
    var newImageWrap = document.createElement('div');
    var image = document.createElement('img');
    newImageWrap.classList.add('ad-form__photo');
    newImageWrap.classList.add('ad-form__photo--added');
    image.src = src;
    image.style.width = ImageParams.WIDTH;
    image.style.height = ImageParams.HEIGHT;
    image.style.borderRadius = ImageParams.BORDER_RADIUS;
    newImageWrap.appendChild(image);
    imagesContainer.appendChild(newImageWrap);
    removeEmptyImgWrap();
  };

  var addEmptyImgWrap = function () {
    if (!document.querySelector('.ad-form__photo--empty')) {
      var emptyImgWrap = document.createElement('div');
      emptyImgWrap.classList.add('ad-form__photo');
      emptyImgWrap.classList.add('ad-form__photo--empty');
      imagesContainer.appendChild(emptyImgWrap);
    }
  };

  var uploadFile = function (chooser, func) {
    var files = Array.from(chooser.files).filter(hasCorrectType);
    if (files) {
      files.forEach(function (it) {
        var reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          func(evt.target.result);
        });
        reader.readAsDataURL(it);
      });
    }
  };

  var removeImages = function () {
    avatarPreview.src = DEFAULT_AVATAR;
    var addedImages = document.querySelectorAll('.ad-form__photo--added');
    if (addedImages) {
      addedImages.forEach(function (it) {
        it.remove();
      });
    }
    addEmptyImgWrap();
  };

  var onAvatarChange = function (evt) {
    uploadFile(evt.target, changeAvatar);
  };

  var onPhotoChange = function (evt) {
    uploadFile(evt.target, addImages);
  };

  var activate = function () {
    avatarChooser.addEventListener('change', onAvatarChange);
    imageChooser.addEventListener('change', onPhotoChange);
  };

  window.image = {
    activate: activate,
    remove: removeImages
  };
})();
