import { Component, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';


@Component({
  selector: 'app-fav-recipes-list',
  templateUrl: './fav-recipes-list.component.html',
  styleUrls: ['./fav-recipes-list.component.css']
})
export class FavRecipesListComponent implements OnInit {
  @Output() filteredRecipes: Recipe[]=[];
  @Output() isLoading: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    let currentUser = JSON.parse(localStorage.getItem("userInfo"));
    let userId = currentUser['id']
    console.log('user Id: '+userId)
    this.recipeService.getRecipes().subscribe(resData=>{
      for (let recipe of resData) {
          let currentFav = recipe['favorite']
          
          if (currentFav.includes(userId)) {
              console.log(true)
              console.log(recipe)
              this.filteredRecipes.push(recipe)
          }
      }
      console.log(this.filteredRecipes)
      
    })
  }

}