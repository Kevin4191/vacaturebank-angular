import { Component, OnInit } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileWindowDialogComponent } from './profile-window-dialog/profile-window-dialog.component';
import { LogInComponent } from '../log-in/log-in.component';
import { userDTO } from '../model/userDTO';
import { UserService } from '../service/user-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(public dialog: MatDialog, private userService: UserService) { }
  userName!: any;
  userEmail!: any; 
  faUserCircle = faCircleUser;
  userRole: any;

  ngOnInit(){
    this.userRole = localStorage.getItem('userRole');
  }

  openDialog(event: any) {
    let targetAttr = event.target.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'profile-window-dialog';
    dialogConfig.height = '200px';
    dialogConfig.width = '250px';
    dialogConfig.position = {
      top: targetAttr.y + targetAttr.height + 10 + "px",
      left: targetAttr.x - targetAttr.width - 56 + "px"
    }
    if (this.userService.userDTO) {
      dialogConfig.data = {
        userName: this.userService.userDTO.userName,
        userEmail: this.userService.userDTO.userEmail
      }
    }
    const dialogRef = this.dialog.open(ProfileWindowDialogComponent, dialogConfig)
  }
 
}
