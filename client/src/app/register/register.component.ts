import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() usersFromHomeComponent: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup = new FormGroup({});
  validationsErrors: string[] = [];
  maxDate: Date;

  constructor(private accountService: AccountService, private toastr: ToastrService,
              private fb: FormBuilder, private router: Router) {
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  ngOnInit(): void {
    this.initializeForm()
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(response => {
      this.router.navigateByUrl('/members');
    }, error => {
      this.validationsErrors = error;
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
