import { Component, OnInit, Output } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-my-recipes-list",
  templateUrl: "./my-recipes-list.component.html",
  styleUrls: ["./my-recipes-list.component.css"],
})
export class MyRecipesListComponent implements OnInit {
  filteredRecipes: Recipe[] = [];
  isLoading: boolean;
  public p = 1;

  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    this.isLoading = true;
    this.recipeService.filterRecipes("Моите рецепти").subscribe((res) => {
      this.filteredRecipes = res;
      this.isLoading = false;
    });
  }
}
