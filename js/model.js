import { async } from "regenerator-runtime";
import "core-js/stable";
import "regenerator-runtime/runtime";
import { API_URL, RES_PER_PAGE } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
  search: {
    query: "",
    results: [],
    page: 1,
    resultsperpage: RES_PER_PAGE,
  },
};

export const loadrecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      cookingtime: recipe.cooking_time,
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceurl: recipe.source_url,
      imageurl: recipe.image_url,
      servings: recipe.servings,
      ingredients: recipe.ingredients,
    };
    console.log(state.recipe);
  } catch (err) {
    throw err;
  }
};

export const loadserchresult = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    console.log(data);

    state.search.results = data.data.recipes.map((recipes) => {
      return {
        id: recipes.id,
        title: recipes.title,
        publisher: recipes.publisher,
        imageurl: recipes.image_url,
      };
    });

    console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

export const getsearchresultpage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsperpage;
  const end = page * state.search.resultsperpage;

  return state.search.results.slice(start, end);
};
