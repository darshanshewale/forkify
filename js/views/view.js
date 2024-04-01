import icons from "url:../../img/icons.svg";
import "core-js/stable";
import "regenerator-runtime/runtime";

export default class view {
  _data;

  render(data) {
    if (!data || (Array.isArray(data) && data.length == 0)) {
      return this.renderError();
    }

    this._data = data;
    const markup = this._generatemarkup();
    this._clear();

    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentel.innerHTML = "";
  }

  renderspinner = function () {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div> `;

    this._clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  };

  renderError(message = this._errormessage) {
    const markup = `<div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>`;
    this._clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="recipe">
      <div class="message">
        <div>
          <svg>
            <use href="${icons}.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._parentel.insertAdjacentHTML("afterbegin", markup);
  }
}
