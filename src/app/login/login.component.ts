import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    NgIf,
    MatButton,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { name, password } = this.loginForm.value;

      const result = await this.userService.findUser(name, password);

      if (typeof result === 'string') {
        alert('No se puede iniciar sesión: ' + result);
      } else {
        result.password = '';
        localStorage.setItem('user',JSON.stringify(result));
        this.router.navigate(['/home'], { replaceUrl: true });
      }
    }
  }

  onCancel() {
    this.loginForm.reset();
  }
}
