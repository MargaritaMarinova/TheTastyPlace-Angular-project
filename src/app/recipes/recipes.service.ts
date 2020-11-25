import { HttpClient } from '@angular/common/http';
import { TagPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import {map, tap} from 'rxjs/operators';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  /**private recipes: Recipe[] = [
    new Recipe(
      "Pancakes1",
      "Very delicious breacfast",
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2",
      "breakfast"
    ),
    new Recipe(
      "Pancakes2",
      "Very delicious breacfast",
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2",
      "breakfast"
    ),
    new Recipe(
      "Pancakes3",
      "Very delicious breacfast",
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2",
      "breakfast"
    ),
  ];**/

  private recipes: Recipe[] = [];

  constructor(private http: HttpClient){}

  saveRecipe(recipe: Recipe){
    this.http.post('https://thetastyplace-6a02c.firebaseio.com/recipes.json', recipe)
    .subscribe(
      (response)=> {
        console.log(response)
      }
    )
  }

  fetchRecipes () {

  }
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    this.http
    .get<Recipe[]>('https://thetastyplace-6a02c.firebaseio.com/recipes.json')
    .subscribe(res => {
      const fetchedRecipes=[];
      for (let key in res){
        fetchedRecipes.push({
          ...res[key]
        });
        this.recipes = fetchedRecipes;
        this.setRecipes(this.recipes);
      } 

    })
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
