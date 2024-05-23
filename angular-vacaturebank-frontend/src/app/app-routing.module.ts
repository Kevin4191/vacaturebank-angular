import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { UpdateVacancyComponent } from './update-vacancy/update-vacancy.component';

const routes: Routes = [{ path: 'home', component: HomeComponent },
{ path: 'login', component: LogInComponent },
{ path: 'create', component: CreateVacancyComponent, canActivate: [AuthGuard] },
{ path: 'update/:id', component: UpdateVacancyComponent, canActivate: [AuthGuard] },
{ path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
