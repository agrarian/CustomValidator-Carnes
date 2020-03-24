import { Directive, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, FormGroup } from '@angular/forms';

function validateEndDateNotBeforeStartDateFactory() {
    return (c: FormGroup) => {
        let isInValid = (c.controls.enddate.value < c.controls.startdate.value);
        return isInValid ? { 'endDateNotBeforeStartDate': { valid: false } } : null;
    };
}

@Directive({
    selector: '[endDateNotBeforeStartDate][ngModel],[endDateNotBeforeStartDate][formControl]',
    providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => EndDateNotBeforeStartDateValidator), multi: true }
    ]
  })
  export class EndDateNotBeforeStartDateValidator {
    validator: Function;
    
    constructor() {
      this.validator = validateEndDateNotBeforeStartDateFactory();
    }
    
    validate(c: FormGroup) {
      return this.validator(c);
    }   
  }