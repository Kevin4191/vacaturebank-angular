import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [{ path: 'home', component: HomeComponent, canActivate : [AuthGuard]}, { path: 'login', component: LogInComponent },
{ path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
