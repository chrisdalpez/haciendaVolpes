import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Input, Output, EventEmitter } from '@angular/core'; 


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public icon = 'favorite_border';
  selectedColor: string = 'white';

  public changeIcon(newIcon : string) {
    this.icon = newIcon; 
  }

  @Input() recipe: Recipe | null = null;
  @Output() edit = new EventEmitter<Recipe>();

/*
  public recipes: Recipe[] = [
    new Recipe('Blue Lagoon', 'Tasty blue lagoon', 'Longdrink', '#c1e45b', 0, false, 'https://primochef.it/wp-content/uploads/2021/06/SH_cocktail_blue_lagoon-640x350.jpg',),
    new Recipe('Caipiroska', 'Tasty Caipiroska', 'Cocktail', '#ffbe29', 0, false, 'https://www.bazery.com/wp-content/uploads/2021/10/1490620884092-1.jpg'),
    new Recipe('Jungle Cat', 'One of the most known riff of the Jungle Bird cocktail', 'Cocktail', '#ffbe29', 0, false, 'https://cdn.shopify.com/s/files/1/1216/2612/files/Jungle_Cat_480x480.jpg?v=1604802351'),
    new Recipe('Ocean Breeze', 'From Blue lagoon, with a splash of pineapple juice and Amaretto',  'Longdrink', '#c1e45b', 0, false, 'https://lowcarb-ology.com/wp-content/uploads/2018/06/electric-lemonade-feature-compressor-e1629474398405.jpg'),
    new Recipe('Old Fashioned', 'Born in New York around late 1800, this is one of the "uforgettables" cocktails', 'Old fashioned', '#b75113', 0, false, 'https://www.drinkporn.eu/wp-content/uploads/2021/01/drink-porn-italy-old-fashioned-1024x680.png' ),
    new Recipe('Lemon Drop', '', 'Martini', '#9cf1e3', 0, false, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsaHrCb5IiQuzfiYYmfmBcCUDnzjGWuMXELA&usqp=CAU' ),
    new Recipe('Grasshoper', '', 'Martini', '#9cf1e3', 0, false, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRnS5UMhNy5ixkPdQpB8kYqesd6AFybqNx4Q&usqp=CAU' ),
 
  ]; 
  */


  constructor() { }

  ngOnInit(): void {
    
  }

}
