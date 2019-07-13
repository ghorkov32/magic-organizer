import { ErrorStateMatcher }                       from '@angular/material';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class CommonErrorStateMatcher implements ErrorStateMatcher {

  constructor() {
  }

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(
      control && control.invalid && (
        control.dirty || control.touched
      )
    );
  }

}
