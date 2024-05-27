import { Component, Inject, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-profile-window-dialog',
  templateUrl: './profile-window-dialog.component.html',
  styleUrls: ['./profile-window-dialog.component.css']
})
export class ProfileWindowDialogComponent implements OnInit {
  faUserCircle = faUserCircle;
  token: string | null = null;
  userName: string | null = null;
  userEmail: string | null = null;
  constructor(
    public dialogRef: MatDialogRef<ProfileWindowDialogComponent>,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.userName = localStorage.getItem('userName');
    this.userEmail = localStorage.getItem('userEmail');
  }

  redirectToLogIn() {
    this.router.navigate(['/login']);
    this.dialogRef.close();
  }

  logOut() {
    this.authService.logout();
    window.location.reload();
    this.dialogRef.close();
  }
}
