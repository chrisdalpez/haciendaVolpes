import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { Input, Output, EventEmitter } from '@angular/core'; 


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  // @Input: Decorator that marks a class field as an input property and supplies configuration metadata.
  // recipe comes from Recipe
  @Input() recipe: Recipe | null = null;

  // @Output: Decorator that marks a class field as an output property and supplies configuration metadata. 
  // The DOM property bound to the output property is automatically updated during change detection.
  @Output() edit = new EventEmitter<Recipe>();

  constructor() { }

  ngOnInit(): void {
  }

}
