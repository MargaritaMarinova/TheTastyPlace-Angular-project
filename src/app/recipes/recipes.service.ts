import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { exhaustMap, map, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserService } from '../users/user.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  

  loadedRecipes: Recipe[] = [];

  constructor(private http: HttpClient, 
    private router: Router,
    private userService: UserService) {}

  saveRecipe(recipeData: {
    name: string;
    imageUrl: string;
    description: string;
    category: string;
  }) {
    this.http
      .post(
        "https://thetastyplace-6a02c.firebaseio.com/recipes.json",
        recipeData
      )
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.userService.user.pipe(
      take(1), 
      exhaustMap(user => {
      return this.http
      .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json?", {
        params: new HttpParams().set('auth', user.token)
      })
    }),
    map((resData) => {
      const fetchedRecipes: Recipe[] = [];
      for (const key in resData) {
        fetchedRecipes.push({ ...resData[key], id: key });
      }
      return fetchedRecipes;
    }))
  }

  getRecipe(id: string) {
    return this.http.get(
      `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`
    );
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    this.http
      .put(
        `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`,
        newRecipe
      )
      .subscribe();
  }

  deleteRecipe(id: string) {
    this.http
      .delete(`https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`)
      .subscribe();
  }
}
