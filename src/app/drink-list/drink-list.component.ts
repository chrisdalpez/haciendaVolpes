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
  //observable to collect datas from Firestore
  drinklist: Observable<any[]>;
  //Local variable where documents (drink recipes) of the drinklist collection are stored.
  recipes: Recipe[] = []; 
  //creates the reference to the Firestore collection
  drinklistCollection?: AngularFirestoreCollection;

  //In constructor are passed the dialog service(Matdialog) and firestore API
  constructor(private dialog: MatDialog, firestore: AngularFirestore) {
    //collection reference
    this.drinklistCollection = firestore.collection<Recipe>('drinkList');
    //Listen to all documents in the collection and its possible query as an Observable.
    this.drinklist = this.drinklistCollection.valueChanges();
    //Listen to edit actions performed on the collection from Firestore. It updates drinkList.
    this.drinklist.subscribe((res: Recipe[]) => {this.recipes = res}) 

  }

  //Methods used to perform CRUD actions

  //Add Recipe: allows user to create a new recipe 
  // .doc() => Create a reference to a single document in a collection.
  // .set() => Create or overwrite a single document.

  addRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).set(recipe);
  }

  //Edit Recipe: allows user to edit an existing recipe (which means editing a document into the Firestore collection).
  // .update() => Update some fields of a document without overwriting the entire document.
  editRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).update(recipe);
  }

  //Remove Recipe: allows user to remove an existing recipe. 
  // .delete() => Delete a document from the collection.
  removeRecipe(recipe: Recipe) {
    this.drinklistCollection?.doc(recipe.id.toString()).delete();
  }

  id: number = 0;

  //dialogbox to create a new cocktail
  newDrink(): void {
    // .open() => Opens a modal dialog containing the given component.
    const dialogRef = this.dialog.open(DrinkdialogComponent, {
      width: '270px', //dialog has a width of 270px
      data: {
        recipe: {
          id: this.recipes.length + 1, //id comes from a sum between the recipes array lenght + 1
        }, //passes an empty recipe 
      },
    });
    dialogRef
      // .afterClosed() => Gets an observable that is notified when the dialog is finished closing.
      .afterClosed()
      // .subscribe() => Subscribe a new result
      .subscribe((result: DrinkDialogResult | undefined) => {
        if (!result) {
          return;
        }
        //Add Recipe is called to add a new document to firestore collection. Result comes from the subscription at line 73.
        this.addRecipe(result.recipe);
      });
  }

   //dialogbox to edit an existing cocktail
  editDrink(recipe: Recipe): void {
     // .open() => Opens a modal dialog containing the given component.
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
     // .afterClosed() => Gets an observable that is notified when the dialog is finished closing.
    // .subscribe() => Subscribe a new result
    dialogRef.afterClosed().subscribe((result: DrinkDialogResult | undefined) => {
      if (!result) {
        return;
      }
      //If this statement is true, the true boolean calls removeRecipe in order to remove the doc from collection.
      if (result.delete = true) {
        this.removeRecipe(recipe);
      }
      //Otherwise, the recipe will be updated.
      this.editRecipe(result.recipe);
    });
  }
  
  ngOnInit(): void {
  }
}
