import { Component, Input, OnInit } from "@angular/core";
import { RecipeService } from '../../recipes.service';



@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe;
  isLoading = false;
  isFavorite: any;
  isCreator: boolean;

  constructor(private recipeService: RecipeService) {}

  onDetails(id: string) {
    this.isLoading = true;
    this.recipeService.getRecipe(id).subscribe((resData) => {
      console.log(resData)
      this.recipe = resData;
      
      this.isLoading = false;
    });
  }

  ngOnInit() {}
}
