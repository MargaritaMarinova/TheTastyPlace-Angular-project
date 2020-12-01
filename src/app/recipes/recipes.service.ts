import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import { exhaustMap, filter, map, take } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserService } from "../users/user.service";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  loadedRecipes: Recipe[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  saveRecipe(recipeData: {
    name: string;
    imageUrl: string;
    description: string;
    category: string;
  }) {
    let currentUser = JSON.parse(localStorage.getItem('userInfo'));
    console.log(currentUser)
    this.http
      .post("https://thetastyplace-6a02c.firebaseio.com/recipes.json", {
        ...recipeData,
        favorite: "false",
        creator: currentUser['id']
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    return this.http
      .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
      .pipe(
        map((resData) => {
          const fetchedRecipes: Recipe[] = [];
          for (const key in resData) {
            fetchedRecipes.push({ ...resData[key], id: key });
          }
          return fetchedRecipes;
        })
      );
  }

  filterRecipes(cat: string) {
    if (cat === "Всички") {
      return this.http
        .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
        .pipe(
          map((resData) => {
            const fetchedRecipes: Recipe[] = [];
            for (const key in resData) {
              fetchedRecipes.push({ ...resData[key], id: key });
            }
            return fetchedRecipes;
          })
        );
    }
    if(cat==="Моите рецепти"){
      return this.http
      .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
      .pipe(
        map((resData) => {
          const filteredRecipes: Recipe[] = [];
          let currentUser = JSON.parse(localStorage.getItem("userInfo"));
          for (const key in resData) {
              if (resData[key]["creator"] === currentUser['id']) {
              filteredRecipes.push({ ...resData[key], id: key });
            }
          }
          return filteredRecipes;
        })
      ); 
    }
    return this.http
      .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
      .pipe(
        map((resData) => {
          const filteredRecipes: Recipe[] = [];
          for (const key in resData) {
              if (resData[key]["category"] === cat) {
              filteredRecipes.push({ ...resData[key], id: key });
            }
          }
          return filteredRecipes;
        })
      );
  }

  getRecipe(id: string) {
    return this.http.get(
      `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`
    );
  }

  updateRecipe(id: string, newRecipe: Recipe) {
    this.http
      .patch(
        `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`,
        newRecipe
      )
      .subscribe();
  }

  updateFavStatus(id: string, isFavorite: boolean) {
    return this.http.patch(
      `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`,
      { favorite: isFavorite }
    );
  }

  checkCreator(createdBy: string) {
    let currentUser = JSON.parse(localStorage.getItem("userInfo"));
    if (currentUser["id"] === createdBy) {
      return true;
    } else {
      return false;
    }
  }

  deleteRecipe(id: string) {
    this.http
      .delete(`https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`)
      .subscribe();
  }
}
