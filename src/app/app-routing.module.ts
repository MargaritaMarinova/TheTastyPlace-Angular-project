import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { RecipeCreateComponent } from "./recipes/recipe-create/recipe-create.component";
import { RecipeDetailsComponent } from "./recipes/recipe-details/recipe-details.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipesListComponent } from "./recipes/recipes-list/recipes-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { UserLoginComponent } from "./users/user-login/user-login.component";
import { UserRegisterComponent } from "./users/user-register/user-register.component";
import { UserGuard } from "./users/user.guard";

const appRoutes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [UserGuard],
    children: [
      { path: "", component: RecipesListComponent },
      { path: "create", component: RecipeCreateComponent },
      { path: ":id", component: RecipeDetailsComponent },
      { path: ":id/edit", component: RecipeEditComponent },
    ],
  },
  { path: "create", component: RecipeCreateComponent },
  { path: "register", component: UserRegisterComponent },
  { path: "login", component: UserLoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
