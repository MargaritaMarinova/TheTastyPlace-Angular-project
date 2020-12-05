import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Recipe } from "./recipe.model";
import {  map } from "rxjs/operators";



@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  favorites = [];
  isFavorite: boolean;
  selectedRecipe: any;

  loadedRecipes: Recipe[] = [];

  constructor(
    private http: HttpClient
  ) {}

  saveRecipe(recipeData: {
    //done
    name: string;
    imageUrl: string;
    description: string;
    category: string;
  }) {
    let currentUser = JSON.parse(localStorage.getItem("userInfo"));
    console.log(currentUser);
    this.http
      .post("https://thetastyplace-6a02c.firebaseio.com/recipes.json", {
        ...recipeData,
        favorite: [''],
        creator: currentUser["id"],
      })
      .subscribe((response) => {
        console.log(response);
      });
  }

  getRecipes() {
    //done
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
    //done for now
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
    if (cat === "Моите рецепти") {
      return this.http
        .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
        .pipe(
          map((resData) => {
            const filteredRecipes: Recipe[] = [];
            let currentUser = JSON.parse(localStorage.getItem("userInfo"));
            for (const key in resData) {
              if (resData[key]["creator"] === currentUser["id"]) {
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
  
    return this.http
      .get("https://thetastyplace-6a02c.firebaseio.com/recipes.json")
      .pipe(
        map((resData) => {
          const fetchedRecipes: Recipe[] = [];
          
          for (const key in resData) {
            fetchedRecipes.push({ ...resData[key], id: key });
            for(let el of fetchedRecipes) {
              if(el['id']===id){
                this.selectedRecipe = el;
              }
            }
          }
          return this.selectedRecipe;
        })
      );
  }
  

  updateRecipe(id: string, newRecipe: Recipe) {
    //done
    this.http
      .patch(
        `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`,
        newRecipe
      )
      .subscribe();
  }

    checkIfiSFavorite(favorites){
      let currentUser = JSON.parse(localStorage.getItem("userInfo"));
      let userId = currentUser["id"];
      if(favorites.includes(userId)){
        return true;
      }
           else {
          return false;
        }
       }

  updateFavorite(id: string) {
    let currentUser = JSON.parse(localStorage.getItem("userInfo"));
    let userId = currentUser["id"];
    this.http
      .get(`https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`)
      .subscribe((resData) => {
        this.favorites = resData["favorite"];
        if (this.favorites.includes(userId)) {
          for (let i = 0; i <= this.favorites.length; i++) {
            if (this.favorites[i] === userId) {
              this.favorites.splice(i, 1);
              console.log('favorites ' + this.favorites)
            }
          }
        } else {
          this.favorites.push(userId);
        }
        this.http
          .patch(
            `https://thetastyplace-6a02c.firebaseio.com/recipes/${id}/.json`,
            { 'favorite': this.favorites }
          )
          .subscribe();
      });
  }

  checkCreator(createdBy: string) {
    //done
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