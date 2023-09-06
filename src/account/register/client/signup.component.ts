import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AbstractControl,
  AbstractControlOptions,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { ClientService } from '../../client.service';
// import { ActivityStatus, Customer } from '../../shared/models/customer.model';
// import { User, UserRole } from 'src/app/shared/models/user.model';
// import { AuthService } from '../auth.service';

@Component({
  selector: 'app-client-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignUpComponent implements OnInit {
  signupForm?: FormGroup;
  isVisible = false;
  inputType: 'text' | 'password' = 'password';
  isEmailDisabled = false; // Flag to disable the email input field

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [
          Validators.required,
          this.validateCellNumber(),
        ]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
      },
      { validators: this.passwordMatchValidator } as AbstractControlOptions
    );

    const email = this.route.snapshot.queryParams['email']; // Get the email value from query parameter
    if (email) {
      this.signupForm.controls['email'].setValue(email); // Set the email value in the form
      this.isEmailDisabled = true; // Disable the email input field
    }
  }

  toggleVisibility() {
    this.isVisible = !this.isVisible;
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  validateCellNumber() {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const cellNumber = control.value;

      if (cellNumber) {
        const cleanedCellNumber = cellNumber.replace(/[+-.() ]/g, '');
        if (
          cleanedCellNumber.charAt(0) === '0' ||
          (cleanedCellNumber.charAt(0) === '1' &&
            cleanedCellNumber.length !== 11) ||
          (cleanedCellNumber.charAt(0) !== '1' &&
            cleanedCellNumber.length !== 10)
        ) {
          return { error: true };
        } else {
          return null;
        }
      } else {
        return null;
      }
      return null;
    };
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSignUp(): void {
    try {
      // if (this.signupForm) {
      //   if (this.signupForm.valid) {
      //     const newUser: User = {
      //       name:
      //         this.signupForm.controls['firstName'].value +
      //         ' ' +
      //         this.signupForm.controls['lastName'].value,
      //       email: this.signupForm.controls['email'].value,
      //       address: '',
      //       profileImage: '',
      //       role: UserRole.Customer,
      //       password: this.signupForm.controls['password'].value,
      //       phoneNumber: this.signupForm.controls['phone'].value,
      //     };
      //     this.authService.signUp(newUser).subscribe((response) => {
      //       if (response.success && response.data) {
      //         const customer: Customer = {
      //           id: response.data.id,
      //           role: UserRole.Customer,
      //           companyName: '',
      //           companyLocation: '',
      //           companyCellNumber: '',
      //           companyPhoneNumber: '',
      //           companyFax: '',
      //           tours: [],
      //           activityStatus: ActivityStatus.Active,
      //           name: '',
      //           email: '',
      //           phoneNumber: '',
      //           address: '',
      //           profileImage: '',
      //           password: '',
      //           contracts: [],
      //           companyEmail: ''
      //         };
      //         this.clientService.create(customer).subscribe(() => {
      //           this.router.navigate(['/client/login']);
      //         });
            // } else {
              // handle the error
            // }
          // });
        // } else {
          // Handle form validation errors
        // }
      // }
    } catch (error) {
      console.log(error);
    }
  }
}
