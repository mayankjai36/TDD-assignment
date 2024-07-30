import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StringCalculatorService {
  constructor() {}

  add(numbers: string): number {
    if (!numbers) {
      return 0;
    }

    let delimiters = [',', '\n'];
    if (numbers.startsWith('//')) {
      const delimiterPart = numbers.split('\n')[0];
      const restOfNumbers = numbers.split('\n').slice(1).join('\n');
      let customDelimiters: string[] = [];

      if (delimiterPart.includes('[') && delimiterPart.includes(']')) {
        const matches = delimiterPart.match(/\[(.*?)\]/g);
        if (matches) {
          customDelimiters = matches.map((d) => d.slice(1, -1));
        }
      } else {
        customDelimiters.push(delimiterPart[2]);
      }

      delimiters = delimiters.concat(customDelimiters);
      numbers = restOfNumbers;
    }

    const regex = new RegExp(`[${delimiters.join('')}]`);
    const numberArray = numbers
      .split(regex)
      .map((num) => parseInt(num, 10))
      .filter((num) => !isNaN(num));

    const negatives = numberArray.filter((num) => num < 0);
    if (negatives.length > 0) {
      throw new Error(`Negatives not allowed: ${negatives.join(', ')}`);
    }

    return numberArray
      .filter((num) => num <= 1000)
      .reduce((sum, num) => sum + num, 0);
  }
}
