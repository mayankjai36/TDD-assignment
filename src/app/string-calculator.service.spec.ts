import { TestBed } from '@angular/core/testing';
import { StringCalculatorService } from './string-calculator.service';

describe('StringCalculatorService', () => {
  let service: StringCalculatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringCalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    expect(service.add('')).toEqual(0);
  });

  it('should return the number for a single number string', () => {
    expect(service.add('1')).toEqual(1);
    expect(service.add('5')).toEqual(5);
  });

  it('should return the sum for two numbers separated by a comma', () => {
    expect(service.add('1,2')).toEqual(3);
  });

  it('should handle an unknown amount of numbers', () => {
    expect(service.add('1,2,3,4,5')).toEqual(15);
  });

  it('should handle new lines between numbers', () => {
    expect(service.add('1\n2,3')).toEqual(6);
  });

  it('should support different delimiters', () => {
    expect(service.add('//;\n1;2')).toEqual(3);
    expect(service.add('//|\n1|2|3')).toEqual(6);
  });

  it('should throw an exception for negative numbers', () => {
    expect(() => service.add('1,-2,3')).toThrowError('Negatives not allowed: -2');
    expect(() => service.add('1,-2,-3')).toThrowError('Negatives not allowed: -2, -3');
  });

  it('should ignore numbers bigger than 1000', () => {
    expect(service.add('2,1001')).toEqual(2);
    expect(service.add('1000,1001,2')).toEqual(1002);
  });

  it('should handle delimiters of any length', () => {
    expect(service.add('//[***]\n1***2***3')).toEqual(6);
  });

  it('should handle multiple delimiters', () => {
    expect(service.add('//[*][%]\n1*2%3')).toEqual(6);
  });

  it('should handle multiple delimiters with length longer than one char', () => {
    expect(service.add('//[***][%%%]\n1***2%%%3')).toEqual(6);
  });
});
