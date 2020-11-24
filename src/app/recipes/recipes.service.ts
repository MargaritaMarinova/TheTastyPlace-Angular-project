import { Subject } from 'rxjs';
import { Recipe } from "./recipe.model";

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
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
    )
  ];

  getRecipes() {
    console.log('get recipes started');
    return this.recipes;
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);  
    console.log(this.recipes)  
    this.recipesChanged.next(this.recipes);
    }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
