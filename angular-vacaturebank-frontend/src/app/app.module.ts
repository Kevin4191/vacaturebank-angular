import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {  HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { VacancyListComponent } from './vacancy-list/vacancy-list.component';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { SignUpFormDialogComponent } from './vacancy-list/sign-up-form-dialog/sign-up-form-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileWindowDialogComponent } from './header/profile-window-dialog/profile-window-dialog.component';
import { MatButton } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { AuthGuard } from './auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ProfileWindowDialogComponent,
    SignUpFormDialogComponent,
    LogInComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    VacancyListComponent, 
    MatListModule, 
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButton,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    AuthGuard, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
