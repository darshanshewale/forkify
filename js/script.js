import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

import * as model from "./model.js";
import recipeview from "./views/recipeview.js";
import searchview from "./views/searchview.js";
import resultview from "./views/resultview.js";
import paginationview from "./views/paginationview.js";

// const recipecontent = document.querySelector(".recipe");

if (module.hot) {
  module.hot.accept();
}

const showrecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeview.renderspinner();

    await model.loadrecipe(id);

    recipeview.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeview.renderError(`${err}`);
  }
};

const searchresult = async function () {
  try {
    resultview.renderspinner();
    const query = searchview.getquery();
    if (!query) return;

    await model.loadserchresult(query);

    resultview.render(model.getsearchresultpage(1));

    paginationview.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlpagination = function (gotopage) {
  resultview.render(model.getsearchresultpage(gotopage));
  paginationview.render(model.state.search);
};

const init = function () {
  recipeview.addhandlerRender(showrecipe);
  searchview.addhandlersearch(searchresult);
  paginationview.addhandlerclick(controlpagination);
};
init();
