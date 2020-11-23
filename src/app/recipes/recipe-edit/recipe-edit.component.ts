import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipes.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params["id"];
        this.initForm();
      });
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  private initForm() {
    const recipe = this.recipeService.getRecipe(this.id);
    let recipeName = recipe.name;
    let recipeImageUrl = recipe.imageUrl;
    let recipeDescription = recipe.description;
    let recipeCategory = recipe.category;

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imageUrl': new FormControl(recipeImageUrl),
      'description': new FormControl(recipeDescription),
      'category': new FormControl(recipeCategory)
    });
  }

}
