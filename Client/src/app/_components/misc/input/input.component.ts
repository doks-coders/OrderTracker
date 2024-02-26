import { Component, Input, Self } from '@angular/core';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements ControlValueAccessor {
  @Input() text:string=""
  @Input() type:string="text"
  constructor(@Self() public ngControl:NgControl){
    this.ngControl.valueAccessor = this;
  }

  get control():FormControl{
    return this.ngControl.control as FormControl
  }

  writeValue(obj: any): void {
    
  }
  registerOnChange(fn: any): void {
    
  }
  registerOnTouched(fn: any): void {
    
  }
  setDisabledState?(isDisabled: boolean): void {
    
  }

}
