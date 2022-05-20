import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarnComponent } from './earn/earn.component';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: 'earn', component: EarnComponent },
  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
