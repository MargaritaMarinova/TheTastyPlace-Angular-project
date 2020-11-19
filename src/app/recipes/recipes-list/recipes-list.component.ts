import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css']
})
export class RecipesListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe("Pancakes", "Very delicious breacfast","https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2", "breakfast"),
    new Recipe("Pancakes", "Very delicious breacfast","https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_16:9/k%2FPhoto%2FRecipes%2F2020-02-Kielbasa-and-Cabbage-Skillet%2Fkielbasa2", "breakfast")
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
