import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js"
import resultsView from "./views/resultsView.js"


import 'core-js/stable';
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

if(module.hot) {
  module.hot.accept();
}


const controlRecipes = async function() {
  try {

      const id = window.location.hash.slice(1);

      if(!id) return;

      recipeView.renderSpinner();

      await model.loadRecipe(id);
     
      recipeView.render(model.state.recipe);

  } catch (err) {
      console.log(err)
      recipeView.renderError();
  }
};

const controlSearchResults = async function () {

  try {

    resultsView.renderSpinner();

    const query = searchView.getQuery();

    if(!query) return;

    await model.loadSearchResults(query);
    console.log(model.state.search.results);

    resultsView.render(model.state.search.results)
    
  } catch (err) {
      console.log(err)
  }
};


const init = function() {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults)
}
init();