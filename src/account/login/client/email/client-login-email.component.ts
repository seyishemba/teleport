import { Component, Injector, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-client-login-email',
  templateUrl: './client-login-email.component.html',
  styleUrls: ['./client-login-email.component.css'],
})
export class ClientLoginEmailComponent extends AppComponentBase implements OnInit {
  @Output() next = new EventEmitter<string>();
  @Input() isEmailRegistered: boolean = null;

  loginForm?: FormGroup;
  isEmailError: boolean;

  constructor(
    injector: Injector,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),
          Validators.required,
        ],
      ],
    });

    const emailControl = this.loginForm.get('email');
    // Add an event listener for the input event on the email input field
    emailControl?.valueChanges.subscribe(() => {
      if (emailControl.errors?.['pattern']) {
        this.isEmailError = false;
      }
    });
  }

  onNextClick(): void {
    if (this.loginForm) {
      if (this.loginForm.valid && !this.isEmailError) {
        const email: string = this.loginForm.controls['email'].value;
        if (email) {
          this.next.emit(email);
        } else {
          this.isEmailError = true;
        }
      } else {
        this.isEmailError = true;
      }
    }
  }
}
