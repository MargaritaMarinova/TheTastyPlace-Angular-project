import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipesComponent } from './recipes/recipes.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';


const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {path: 'recipes', component: RecipesComponent},
  {path: 'details', component: RecipeDetailsComponent},
  {path: 'create', component: RecipeCreateComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
