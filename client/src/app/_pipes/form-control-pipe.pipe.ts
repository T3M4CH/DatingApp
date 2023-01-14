import {Pipe, PipeTransform} from "@angular/core";
import {AbstractControl, FormControl} from "@angular/forms";

@Pipe({
  name: 'ToFormControl',
})
export class ToFormControlPipe implements PipeTransform {
  transform(value: AbstractControl): FormControl<typeof value['value']> {
    return value as FormControl<typeof value['value']>;
  }
}
