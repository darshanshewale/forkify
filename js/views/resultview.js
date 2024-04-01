import view from "./view";
import "core-js/stable";
import "regenerator-runtime/runtime";
import icons from "url:../../img/icons.svg";

class resultview extends view {
  _errormessage = "No recipe found for your query !";
  _message = "";
  _parentel = document.querySelector(".results");

  _generatemarkup() {
    console.log(this._data);

    return this._data.map(this._grenerateMarkupPreview).join("");
  }

  _grenerateMarkupPreview(result) {
    return `<li class="preview">
    <a class="preview__link " href="#${result.id}">
      <figure class="preview__fig">
        <img src="${result.imageurl}" alt="Test" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${result.title}</h4>
        <p class="preview__publisher">${result.publisher}</p>
        
      </div>
    </a>
  </li>`;
  }
}

export default new resultview();
