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
      
    );
    this.recipeService.updateRecipe(this.id, newRecipe);
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  private initForm() {


    this.recipeService.getRecipe(this.id).subscribe((resData) => {
      this.recipe = resData;
      
      this.recipeForm = new FormGroup({
        name: new FormControl(resData['name']),
        imageUrl: new FormControl(resData['imageUrl']),
        description: new FormControl(resData['description']),
        category: new FormControl(resData['category']),
      });
      console.log(this.recipeForm);
    });
    

    /**let recipeName = recipe.name;
    let recipeImageUrl = recipe.imageUrl;
    let recipeDescription = recipe.description;
    let recipeCategory = recipe.category;*/

    
  }
}
