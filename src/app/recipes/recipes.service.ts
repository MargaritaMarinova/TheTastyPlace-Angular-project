import { Recipe } from "./recipe.model";

export class RecipeService {
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
    ),
    new Recipe(
      "Pancakes4",
      "Very delicious breacfast",
      "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2",
      "breakfast"
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
