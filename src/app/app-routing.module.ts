import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { RecipesComponent } from './drink-list/recipes/recipes.component';
import { TheLoungeComponent } from './the-lounge/the-lounge.component';

const routes: Routes = [
  {path: 'recipes', component: RecipesComponent},
  {path:'drink-list', component:DrinkListComponent},
  {path:'the-lounge', component:TheLoungeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
