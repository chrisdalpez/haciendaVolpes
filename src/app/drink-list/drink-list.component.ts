import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipes/recipe.model';
import { MatDialog } from '@angular/material/dialog';
import { DrinkdialogComponent, DrinkDialogResult } from '../drinkdialog/drinkdialog.component';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-drink-list',
  templateUrl: './drink-list.component.html',
  styleUrls: ['./drink-list.component.css']
})

export class DrinkListComponent implements OnInit {

  drinklist: Observable<any[]>;

  recipes: Recipe[] = []; //remember to store the observable locally to use save and edit functions 

  drinklistCollection?: AngularFirestoreCollection;

  constructor(private dialog: MatDialog, firestore: AngularFirestore) {
    this.drinklistCollection = firestore.collection<Recipe>('drinkList');
    this.drinklist = this.drinklistCollection.valueChanges();
    this.drinklist.subscribe((res: Recipe[]) => {this.recipes = res}) //aggiorna recipes

  }

  addRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).set(recipe);
  }

  editRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).update(recipe);
  }

  removeRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).delete();
  }

  id: number = 0;
  //dialogbox to create a new cocktail
  newDrink(): void {
    const dialogRef = this.dialog.open(DrinkdialogComponent, { //opens a new dialog window and drinkdialogcomponent
      width: '270px', //dialog has a width of 270px
      data: {
        recipe: {
          id: this.recipes.length + 1, //id comes from a sum between the recipes array lenght + 1
        }, //passes an empty recipe 
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: DrinkDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.addRecipe(result.recipe);
        //Implement method to add a new document to firebase collection called "drinkList"
      });
  }

  editDrink(recipe: Recipe): void {
    const dialogRef = this.dialog.open(DrinkdialogComponent, {
      width: '270px',
      data: {
        recipe: { //only in editdrink recipe holds variables with already assigned values (from the creation of the recipe)
          id: recipe.id,
          name: recipe.name,
          description: recipe.description,
          imagePath: recipe.imagePath,
          category: recipe.category,
        },
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: DrinkDialogResult | undefined) => {
      if (!result) {
        return;
      }
      if (result.delete = true) {
        this.removeRecipe(recipe);
      }
      this.editRecipe(result.recipe);
    });
  }
  
  ngOnInit(): void {
  }

}
