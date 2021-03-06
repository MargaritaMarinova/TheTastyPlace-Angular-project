import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';
import { RecipeDetailsComponent } from './recipes/recipe-details/recipe-details.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipes/recipes-list/recipe-item/recipe-item.component';
import { RecipeCreateComponent } from './recipes/recipe-create/recipe-create.component';
import { UsersComponent } from './users/users.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import { DropdownDirective } from './recipes/dropdown.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeService } from './recipes/recipes.service';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoadingSpinnerComponent } from './users/loading-spinner/loading-spinner.component';
import { UserInterceptorService } from './users/user-interceptor.service';
import { HomeComponent } from './home/home.component';
import { SliderTitlesComponent } from './home/slider-titles/slider-titles.component';
import { RecipeCategoryComponent } from './recipes/recipe-category/recipe-category.component';
import { MyRecipesListComponent } from './recipes/my-recipes-list/my-recipes-list.component';
import { FavRecipesListComponent } from './recipes/fav-recipes-list/fav-recipes-list.component';
import { SelectRecipeTextComponent} from './recipes/my-recipes-list/select-recipe-text/select-recipe-text.component'
import { BackButtonComponent } from './recipes/back-button/back-button.component';
import {NgxPaginationModule} from "ngx-pagination";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipesComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeCreateComponent,
    UsersComponent,
    UserLoginComponent,
    UserRegisterComponent,
    UserProfileComponent,
    DropdownDirective,
    LoadingSpinnerComponent,
    HomeComponent,
    SliderTitlesComponent,
    RecipeCategoryComponent,
    MyRecipesListComponent,
    FavRecipesListComponent,
    SelectRecipeTextComponent,
    BackButtonComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [RecipeService, {provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
