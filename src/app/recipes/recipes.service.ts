import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import {map} from 'rxjs/operators';

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

  loadedRecipes: Recipe[] = [];

  constructor(private http: HttpClient){}

  saveRecipe(recipeData: {name: string, imageUrl: string, description: string, category: string}){
    this.http.post('https://thetastyplace-6a02c.firebaseio.com/recipes.json', recipeData)
    .subscribe(
      (response)=> {
        console.log(response)
      }
    )
  }

  

  getRecipes() {
    return this.http
    .get('https://thetastyplace-6a02c.firebaseio.com/recipes.json')
    .pipe(map(resData => {
      const fetchedRecipes: Recipe[] = [];
      for (const key in resData) {
        fetchedRecipes.push({...resData[key], id: key})
      }
      return fetchedRecipes;
    })
    )
  
  }
  

  getRecipe(id: string) {
    this.http.get(`https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`)
    .subscribe(res=>{
      console.log(res)
    })
  
  }



  /*updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }*/
}

