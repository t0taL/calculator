import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalculatorComponent implements OnInit {
  previousExpression: string = '';
  expression: string = '0';
  private result: string = '0';

  readonly actions: string[] = ['( ', ' )', ' ^ ', ' / ', ' * ', ' - ', ' + '];
  readonly keys: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];

  constructor() {
  }

  ngOnInit(): void {
  }

  private calculate(expressionArr: string[]): string {
    for (let i = expressionArr.length - 1; i >= 0 ; i--) {
      if (expressionArr[i] === '(') {
        const solvedBracersExpression: string[] = this.solveBracersExpression(expressionArr.slice(i + 1));
        return this.calculate([...expressionArr.slice(0, i), ...solvedBracersExpression]);
      }
    }

    for (let i = 0; i < expressionArr.length; i++) {
      if (expressionArr[i + 1] === '^') {
        const actionResult: string = this.executeAction(expressionArr[i + 1], expressionArr[i], expressionArr[i + 2]);
        return this.calculate([...expressionArr.slice(0, i), actionResult, ...expressionArr.slice(i + 3)]);
      }
    }

    for (let i = 0; i < expressionArr.length; i++) {
      if (expressionArr[i + 1] === '*' || expressionArr[i + 1] === '/') {
        const actionResult: string = this.executeAction(expressionArr[i + 1], expressionArr[i], expressionArr[i + 2]);
        return this.calculate([...expressionArr.slice(0, i), actionResult, ...expressionArr.slice(i + 3)]);
      }
    }

    for (let i = 0; i < expressionArr.length; i++) {
      if (expressionArr[i + 1] === '+' || expressionArr[i + 1] === '-') {
        const actionResult: string = this.executeAction(expressionArr[i + 1], expressionArr[i], expressionArr[i + 2]);
        return this.calculate([...expressionArr.slice(0, i), actionResult, ...expressionArr.slice(i + 3)]);
      }
    }

    if (expressionArr.length === 1) {
      return expressionArr[0];
    }
  }

  private executeAction(action: string, firstOperand: string, secondOperand: string): string {
    switch (action) {
      case '*': return (+firstOperand * +secondOperand).toString();
      case '/': return (+firstOperand / +secondOperand).toString();
      case '+': return (+firstOperand + +secondOperand).toString();
      case '-': return (+firstOperand - +secondOperand).toString();
      case '^': return Math.pow(+firstOperand, +secondOperand).toString();
    }
  }

  private solveBracersExpression(bracersExpression: string[]): string[] {
    for (let i = 0; i < bracersExpression.length; i++) {
      if (bracersExpression[i] === ')') {
        const bracersExpressionResult: string = this.calculate(bracersExpression.slice(0, i));
        return [bracersExpressionResult, ...bracersExpression.slice(i + 1)];
      }
    }
    return [];
  }

  enterAction(action: string): void {
    this.expression += action;
  }

  enterKey(key: string): void {
    this.expression = (this.expression === '0') ? key : this.expression + key;
  }

  getResult(): void {
    if (this.expression) {
      this.result = this.calculate(this.expression.split(' '));
      this.previousExpression = `${this.expression} = ${this.result}`;
      this.expression = this.result;
    }
  }

  clear(): void {
    if (this.expression !== '0') {
      this.expression = this.result = '0';
    } else {
      this.previousExpression = '';
    }
  }
}
