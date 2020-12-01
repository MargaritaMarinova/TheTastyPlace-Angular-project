import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";

import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";
import {exhaustMap, map, take} from 'rxjs/operators';
import { UserService } from 'src/app/users/user.service';

@Component({
  selector: "app-recipe-details",
  templateUrl: "./recipe-details.component.html",
  styleUrls: ["./recipe-details.component.css"],
})
export class RecipeDetailsComponent implements OnInit {
  recipe;
  id: string;
  isLoading = false;
  isFavorite: boolean;
  isCreator: boolean;

  constructor(
    private recipeService: RecipeService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.isCreator = false;
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];

      this.recipeService.getRecipe(this.id).subscribe((resData) => {
        this.isCreator = this.recipeService.checkCreator(resData['creator']);
        
        this.recipe = resData;
        this.isFavorite = this.recipe.favorite;
        this.isLoading = false;
      });
    });
  }

  onChangeFavStatus() {
    this.isFavorite = !this.isFavorite;
    this.recipeService.updateFavStatus(this.id, this.isFavorite)
    .subscribe()

};

    

  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.recipeService.getRecipes().subscribe((res) => {
      this.router.navigate([`recipes`]);
    });
  }
}
