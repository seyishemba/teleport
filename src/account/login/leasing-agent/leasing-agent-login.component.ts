import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leasing-agent-login',
  templateUrl: './leasing-agent-login.component.html',
  styleUrls: ['./leasing-agent-login.component.css'],
})
export class LeasingAgentLoginComponent implements OnInit {
  loginForm?: FormGroup;
  isEmailError = false;
  isPasswordError = false;
  isVisible = false;
  inputType: 'text' | 'password' = 'password';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          Validators.required,
        ],
      ],
      password: ['', [Validators.required]],
    });

    const emailControl = this.loginForm.get('email');
    // Add an event listener for the input event on the email input field
    emailControl?.valueChanges.subscribe(() => {
      if (emailControl.errors?.['pattern']) {
        this.isEmailError = false;
      }
    });

    const passwordControl = this.loginForm.get('password');
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
    if (this.loginForm) {
      if (this.loginForm.valid && !this.isPasswordError) {

      } else {
        this.isPasswordError = true;
      }
    }
  }
}
