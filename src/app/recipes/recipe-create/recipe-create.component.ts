import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent implements OnInit {
  recipeForm: FormGroup;

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    console.log(this.recipeForm)
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeDescription = '';
    let recipeCategory = '';

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imageUrl': new FormControl(recipeImageUrl),
      'description': new FormControl(recipeDescription),
      'category': new FormControl(recipeCategory)
    });

  }

}
