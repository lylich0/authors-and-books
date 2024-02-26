import {Directive, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomValidation]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
})
export class CustomValidatorDirective implements Validator {
  // @Input() validationType: string = '';
  validate(control: AbstractControl): ValidationErrors | null {
    let value = control.value;

    if (isNaN(Date.parse(value))) {
      return { 'invalidDate': true }
    }
    else {
      let date = new Date(control.value);
      if (date.getFullYear() > 2006) {
        return { 'invalidDate': true }
      }
    }

    return null;
  }
}
