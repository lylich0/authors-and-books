import {Directive, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomValidation]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: CustomValidatorDirective, multi: true}]
})
export class CustomValidatorDirective implements Validator {
  @Input() validationType: string = '';
  validate(control: AbstractControl): ValidationErrors | null {
    let error: ValidationErrors | null = null;
    let value = control.value;

    switch(this.validationType) {
      case 'date':
        if (isNaN(Date.parse(value))) {
          return { 'invalidDate': true }
        }
        else {
          let date = new Date(control.value);
          if (date.getFullYear() > 2006) {
            return { 'invalidDate': true }
          }
        }
        break;
      case 'text':
        const regexPattern = new RegExp("^[A-Za-z\\s]+$");
        if (!regexPattern.test(value)) {
          error = { 'invalidText': true };
        }
        break;
      case 'number':
        if (value < 10) {
          error = { 'invalidNumber': true};
        }
        break;
      default:
        break;
    }
    return error;
  }
}
