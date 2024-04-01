import "core-js/stable";
import "regenerator-runtime/runtime";
import view from "./view";
import icons from "url:../../img/icons.svg";

class paginationview extends view {
  _parentel = document.querySelector(".pagination");

  addhandlerclick(handler) {
    this._parentel.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");

      if (!btn) return;
      const gotopage = Number(btn.dataset.goto);
      console.log(gotopage);
      handler(gotopage);
    });
  }

  _generatemarkup() {
    const curpage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsperpage
    );
    console.log(numPages);

    if (curpage === 1 && numPages > 1) {
      return `<button data-goto="${
        curpage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curpage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button> `;
    }

    if (curpage === numPages && numPages > 1) {
      return `<button data-goto="${
        curpage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curpage - 1}</span>
    </button>`;
    }

    if (curpage < numPages) {
      return `<button data-goto="${
        curpage - 1
      }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curpage - 1}</span>
      </button>
      <button data-goto="${
        curpage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page${curpage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    return "only 1 page";
  }
}

export default new paginationview();
