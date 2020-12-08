import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { RecipeService } from "../../recipes.service";

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe;
  id: string;
  isLoading = false;
  favorites = this.recipeService.favorites;
  @Input() isFavorite: boolean;
  isCreator: boolean;
  isShowingDetails = false;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  onDetails(id: string) {
    this.isLoading = true;
    this.recipeService.getRecipe(id).subscribe((resData) => {
      this.recipe = resData;
      this.isLoading = false;
      this.isShowingDetails = true;
    });
  }

  onChangeFav(id: string) {
    this.isLoading = true;
    this.recipeService.getRecipe(id).subscribe((resData) => {
      this.isFavorite = this.recipeService.checkIfiSFavorite(
        resData["favorite"]
      );
      this.isFavorite = !this.isFavorite;
      this.recipeService.updateFavorite(id);
      this.isLoading = false;
    });
  }

  ngOnInit() {
    this.isFavorite = this.recipeService.checkIfiSFavorite(
      this.recipe["favorite"]
    );
  }
}
