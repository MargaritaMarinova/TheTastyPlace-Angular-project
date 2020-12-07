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
  isLoading = false;

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
      this.recipeForm.value["ingredients"],
      this.recipeForm.value["category"]
    );
    this.recipeService.updateRecipe(this.id, newRecipe);
    this.recipeService.getRecipes().subscribe((res) => {
      this.router.navigate([`recipes`]);
    });
  }

  onClear() {
    this.initForm();
  }

  private initForm() {
    this.isLoading = true;

    this.recipeService.getRecipe(this.id).subscribe((resData) => {
      this.recipe = resData;

      this.recipeForm = new FormGroup({
        name: new FormControl(resData["name"]),
        imageUrl: new FormControl(resData["imageUrl"]),
        description: new FormControl(resData["description"]),
        ingredients: new FormControl(resData['ingredients']),
        category: new FormControl(resData["category"])
      });
      this.isLoading = false;
    });
  }
}
