import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipes.service';
import { UserService } from '../users/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth = false;
  private subscription: Subscription;
  isLoading = false;
 filteredRecipes: Recipe[];

  constructor(private userService: UserService,
    private recipeService: RecipeService,
    private router: Router) { }

  ngOnInit() {
    this.subscription = this.userService.user
    .subscribe(user => {
      this.isAuth = !user ? false : true;
    })
  }

  onLogout(){
    this.userService.logout();
  }

  onNewRecipe() {
    this.router.navigate(["create"]);
  }

  onSelectCat(cat: string) {
    this.isLoading = true;
    this.recipeService.filterRecipes(cat).subscribe(res=>{
      console.log(res)
      this.isLoading = false;
    })
  }

 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
