import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Vacancy } from '../../model/vacancy';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { mailStructure } from '../../model/mailStructure';
@Component({
  selector: 'app-sign-up-form-dialog',
  templateUrl: './sign-up-form-dialog.component.html',
  styleUrl: './sign-up-form-dialog.component.css',
})
export class SignUpFormDialogComponent {

  fileNames: string[] = [];
  formData: FormData = new FormData();
  signInForm!: FormGroup;
  files!: any;
  name!: any;
  email!: any;
  faPaperclip = faPaperclip;
  vacancy: Vacancy;
  dialogConfigData: any;
  noFileSelected = false;
  constructor(private http: HttpClient, public dialogRef: MatDialogRef<SignUpFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.vacancy = this.data.vacancy;
    this.dialogConfigData = this.data.dialogConfig;

    this.signInForm = new FormGroup({
      companyEmail: new FormControl(this.vacancy.employer.employerEmail),
      email: new FormControl(this.data.email),
      name: new FormControl(this.data.name),
      files: new FormControl(this.data.files, Validators.required)
    });

  }

  mail: mailStructure = {
    to: "",
    cc: "",
    subject: "",
    message: "",
  }

  ngOnInit() {
    this.signInForm.controls['name'].valueChanges.subscribe(res => {
      this.name = res;
    })
  }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      if (file) {
        if (!this.fileNames.includes(file.name)) {
          this.fileNames.push(file.name);
          this.formData.append('file', file);
        }
      }
    }
  }
  closeDialog() {
    this.dialogRef.close()
  }

  saveDialog() {

    this.mail.to = this.vacancy.employer.employerEmail;
    this.mail.cc = this.signInForm.get('email')?.value;
    this.mail.subject = "Vacature " + this.vacancy.vacancyName;
    this.mail.message = "Sollicitatie van " + this.name
    this.files = this.formData;

    if (this.files.entries().next().done) {
      this.noFileSelected = true;
    } else {
      console.log(this.files)
      this.dialogRef.close({ mail: this.mail, files: this.files });
    }

  }

}

