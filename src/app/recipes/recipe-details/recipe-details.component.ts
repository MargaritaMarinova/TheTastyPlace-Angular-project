import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';


@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipe;
  id: string;
  isLoading = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.isLoading=true;
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.recipeService.getRecipe(this.id)
          .subscribe(resData=>{
            this.recipe = resData;
            this.isLoading = false;
          });
        }
      );
  }


    
  

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id)
    this.recipeService.getRecipes().subscribe(
      res => {
        this.router.navigate([`recipes`])
      }
      
    )
   
    
  }
}


