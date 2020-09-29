import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalculatorComponent } from './components/calculator/calculator.component';
import { DisplayComponent } from './components/display/display.component';
import { ButtonComponent } from './components/button/button.component';


@NgModule({
  declarations: [
    CalculatorComponent,
    DisplayComponent,
    ButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CalculatorComponent
  ]
})
export class CalculatorModule {
}
