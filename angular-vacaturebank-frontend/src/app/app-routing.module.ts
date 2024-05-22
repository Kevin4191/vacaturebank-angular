import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';

const routes: Routes = [ 
{ path: 'home', component: HomeComponent },
{ path: 'create', component: CreateVacancyComponent },
{ path: '**', redirectTo: 'home' }

 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
