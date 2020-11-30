import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-recipes-list",
  templateUrl: "./recipes-list.component.html",
  styleUrls: ["./recipes-list.component.css"],
})
export class RecipesListComponent implements OnInit {
  filteredRecipes: Recipe[];
  subscription: Subscription;
  isLoading = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.recipeService.getRecipes()
    .subscribe(resData=>{
      this.filteredRecipes = resData;
      this.isLoading = false;
    });
    
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
}


