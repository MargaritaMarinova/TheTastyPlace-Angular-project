import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  filteredRecipes: Recipe[];
  subscription: Subscription;
  isLoading = false;
  isFavorite: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
        this.filteredRecipes = recipes;
      }
    );

    this.recipeService.getRecipes().subscribe((resData) => {
      this.filteredRecipes = resData;

      this.isLoading = false;
    });
  }

  onCheck(favorites) {
    this.isFavorite = this.recipeService.checkIfiSFavorite(favorites);
  }

  onSelectCat(cat: string) {
    this.isLoading = true;
    this.recipeService.filterRecipes(cat).subscribe((res) => {
      console.log(res);
      this.filteredRecipes = res;
      this.isLoading = false;
    });
  }

  onNewRecipe() {
    this.router.navigate(["create"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
