import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule  } from '@fortawesome/angular-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-profile-window-dialog',
  templateUrl: './profile-window-dialog.component.html',
  styleUrl: './profile-window-dialog.component.css',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FontAwesomeModule]
  
})
export class ProfileWindowDialogComponent {
  faUserCircle = faUserCircle;
}
