import { Component, Input, OnInit } from "@angular/core";
import { Recipe } from "../recipe.model";
import { RecipeService } from '../recipes.service';

@Component({
  selector: "app-recipe-item",
  templateUrl: "./recipe-item.component.html",
  styleUrls: ["./recipe-item.component.css"],
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe;

  constructor(private recipeService: RecipeService){

  }

  onDetails(id: string){
    this.recipeService.getRecipe(id)
    .subscribe(resData=> {
      
      this.recipe = resData;
      console.log(this.recipe)
    })
  }
 

  ngOnInit(): void {}
}
