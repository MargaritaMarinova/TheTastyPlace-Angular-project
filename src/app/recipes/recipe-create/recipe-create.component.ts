import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Recipe } from "../recipe.model";
import { RecipeService } from "../recipes.service";

@Component({
  selector: "app-recipe-create",
  templateUrl: "./recipe-create.component.html",
  styleUrls: ["./recipe-create.component.css"],
})
export class RecipeCreateComponent implements OnInit {
  recipeForm: FormGroup;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const newRecipe = new Recipe(
      this.recipeForm.value["name"],
      this.recipeForm.value["imageUrl"],
      this.recipeForm.value["description"],
      this.recipeForm.value["ingredients"],
      this.recipeForm.value["category"]
    );
    this.recipeService.saveRecipe(newRecipe);
    this.recipeService.getRecipes().subscribe((res) => {
      this.router.navigate(["recipes"]);
    });
  }

  onClear() {
    this.initForm()
  }

  private initForm() {
    let recipeName = "";
    let recipeImageUrl = "";
    let recipeDescription = "";
    let recipeIngredients = "";
    let recipeCategory = "";

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName),
      imageUrl: new FormControl(recipeImageUrl),
      description: new FormControl(recipeDescription),
      ingredients: new FormControl(recipeIngredients),
      category: new FormControl(recipeCategory),
    });
  }
}
