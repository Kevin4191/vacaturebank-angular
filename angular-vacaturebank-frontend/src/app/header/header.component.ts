import { Component } from '@angular/core';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileWindowDialogComponent } from './profile-window-dialog/profile-window-dialog.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(public dialog: MatDialog) { }

  openDialog(event: any) {
    let targetAttr = event.target.getBoundingClientRect();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.panelClass = 'profile-window-dialog';
    dialogConfig.position = {
      top: targetAttr.y + targetAttr.height + 10 + "px",
      left: targetAttr.x - targetAttr.width - 20 + "px"
    }

    const dialogRef = this.dialog.open(ProfileWindowDialogComponent, dialogConfig)
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  faUserCircle = faCircleUser;

}
