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

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class CustomerSignUpComponent implements OnInit {
  signupForm?: FormGroup;
  isVisible: boolean = false;
  inputType: 'text' | 'password' = 'password';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
   
  }

 


}
