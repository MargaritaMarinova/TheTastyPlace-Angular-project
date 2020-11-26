import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-recipe-edit",
  templateUrl: "./recipe-edit.component.html",
  styleUrls: ["./recipe-edit.component.css"],
})
export class RecipeEditComponent implements OnInit {
  id: string;
  recipeForm: FormGroup;
  recipe: any;

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params["id"];
      this.initForm();
    });
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["imageUrl"],
      this.recipeForm.value["description"],
      this.recipeForm.value["category"],
      this.id
    );
    this.recipeService.updateRecipe(this.id, newRecipe);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {
    let recipeName = "";
    let recipeImageUrl = "";
    let recipeDescription = "";
    let recipeCategory = "";

    this.recipeService.getRecipe(this.id).subscribe((resData) => {
      this.recipe = resData;
      recipeName = this.recipe['name']
      console.log(this.recipe);
    });
    

    /**let recipeName = recipe.name;
    let recipeImageUrl = recipe.imageUrl;
    let recipeDescription = recipe.description;
    let recipeCategory = recipe.category;*/

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageUrl: new FormControl(recipeImageUrl),
      description: new FormControl(recipeDescription),
      category: new FormControl(recipeCategory),
    });
  }
}
