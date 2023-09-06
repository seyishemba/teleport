import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ClientService } from 'src/app/client/client.service';
// import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-client-login-password',
  templateUrl: './login-password.component.html',
  styleUrls: ['./login-password.component.css'],
})
export class ClientLoginPasswordComponent implements OnInit {
  @Output() signIn = new EventEmitter<string>();

  passwordForm?: FormGroup;
  isPasswordError = false;
  isVisible = false;
  inputType: 'text' | 'password' = 'password';

  constructor(
    // private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
    });

    const passwordControl = this.passwordForm.get('password');
    // Add an event listener for the input event on the email input field
    passwordControl?.valueChanges.subscribe(() => {
      if (passwordControl.errors) {
        this.isPasswordError = false;
      }
    });
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  onSignIn(): void {
    if (this.passwordForm) {
      if (this.passwordForm.valid && !this.isPasswordError) {
        const password: string = this.passwordForm.controls['password'].value;
          this.signIn.emit(password);
      } else {
        this.isPasswordError = true;
      }
    }
  }
}
