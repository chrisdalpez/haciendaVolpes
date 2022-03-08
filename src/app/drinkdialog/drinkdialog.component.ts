import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Recipe } from '../drink-list/recipes/recipe.model';
import { RecipesComponent } from '../drink-list/recipes/recipes.component';


@Component({
  selector: 'app-drinkdialog',
  templateUrl: './drinkdialog.component.html',
  styleUrls: ['./drinkdialog.component.css']
})
export class DrinkdialogComponent implements OnInit {


  constructor(
    // MatDialogRef => Reference to a dialog opened via the MatDialog service.
    public dialogRef: MatDialogRef<DrinkdialogComponent>,
    private recipesComponent: RecipesComponent,
    @Inject(MAT_DIALOG_DATA) public data: DrinkdialogData //data object to the open method stored in drink-list component.
  ) {}



  ngOnInit(): void {
  }
}
//Exports DialogData Interface in order to use it into drink-list
export interface DrinkdialogData {
  imagePath: string | undefined;
  recipe: Partial<Recipe>; 
  enableDelete: boolean;
}
//Exports DialogResult Interface in order to use it into drink-list
export interface DrinkDialogResult {
  recipe: Recipe;
  delete?: boolean;
}