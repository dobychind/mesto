import {photoZoomed, photoZoomedTitle, popupShowPhoto, openPopup} from './utils.js';

export class Card {
  constructor (dataItem, selectors){
    this._name = dataItem?.name ?? 'Картинка без названия';;
    this._link = dataItem?.link ?? '#';
    this._templateSelector = selectors.templateSelector;
    this._listElementSelector = selectors.listElementSelector;
    this._imageContainer = selectors.imageContainer;
    this._titleSelector = selectors.titleSelector;
    this._likeSelector = selectors.likeSelector;
    this._activeLikeClass = selectors.activeLikeClass;
    this._deleteSelector = selectors.deleteSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector(this._templateSelector).content;
    this._card = cardTemplate.querySelector(this._listElementSelector).cloneNode(true);
    this._cardImage = this._card.querySelector(this._imageContainer);
    this._cardHeader = this._card.querySelector(this._titleSelector);
    this._buttonLike = this._card.querySelector(this._likeSelector);
    this._buttonDelete = this._card.querySelector(this._deleteSelector);
  }

  _setCardData() {
    this._cardImage.style.backgroundImage = `url(${this._link})`;
    this._cardImage.setAttribute('aria-label', this._name);
    this._cardHeader.setAttribute('title', this._name);
    this._cardHeader.textContent = this._name;
  }

  _addEventListeners() {
    this._cardImage.addEventListener('click', ()=>{
      photoZoomed.src = this._link;
      photoZoomed.setAttribute('alt',this._name);
      photoZoomedTitle.textContent = this._name;
      openPopup(popupShowPhoto);
    });
    this._buttonLike.addEventListener('click',()=>{
      this._buttonLike.classList.toggle(this._activeLikeClass);
    });
    this._buttonDelete.addEventListener('click',()=>{
      this._card.remove();
    });
  }
  getCard(){
    this._getTemplate();
    this._setCardData();
    this._addEventListeners();
    return this._card;
  }
}
