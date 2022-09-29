declare module '@mojaloop/ml-number' {
  export enum RoundingMode {
    ROUND_DOWN = 'ROUND_DOWN',
    ROUND_UP = 'ROUND_UP'
  }

  export default class MLNumber {
    constructor (value: string | number | MLNumber)
  
    /**
     * @function sumList
     *
     * @description Adds a list of numbers to a MLNumber
     *
     * @param {array} values Array of values can be string and or number and or MLNumber values
     *
     * @return {MLNumber} - Returns a new MLNumber object and return a new Instance of MLNumber
     */
    sumList (values: MLNumber[]): MLNumber
  
    /**
     * @function add
     *
     * @description Adds a number to a MLNumber
     *
     * @param {string/number/MLNumber} addition - add value to MLNumber
     *
     * @return {MLNumber} - Returns a MLNumber object and return a new Instance of MLNumber
     */
    add (addition: string | number | MLNumber): MLNumber
  
    /**
     * @function multiply
     *
     * @description Multiplies a number and a MLNumber
     *
     * @param {string/number/MLNumber} product - multiply value and a MLNumber
     *
     * @return {MLNumber} - Returns a MLNumber object and return a new Instance of MLNumber
     */
    multiply (product: string | number | MLNumber): MLNumber
  
    /**
     * @function subtract
     *
     * @description Subtracts a number from a MLNumber
     *
     * @param {string/number/MLNumber} difference - difference to be removed from a MLNumber
     *
     * @return {MLNumber} - Returns a MLNumber object and return a new Instance of MLNumber
     */
    subtract (difference: string | number | MLNumber): MLNumber
  
    /**
     * @function divide
     *
     * @description Divides a MLNumber by a value
     *
     * @param {string/number/MLNumber} denominator - Divides and MLNumber by a value
     *
     * @return {MLNumber} - Returns a MLNumber object and return a new Instance of MLNumber
     */
    divide (denominator: string | number | MLNumber): MLNumber
  
    /**
     * @function shiftedBy
     *
     * @description Returns a MLNumber whose value is the value of this MLNumber shifted by n places.
     *
     * @param {number} n - The shift is of the decimal point, i.e. of powers of ten, and is to the left if n is negative or to the right if n is positive.
     *
     * @return {MLNumber} - Returns a MLNumber object and return a new Instance of MLNumber
     */
    shiftedBy (n: number): MLNumber
  
    /**
     * @function toString
     *
     * @description Converts MLNumber to string representation
     *
     * @return {string} - Returns string value from MLNumber object
     */
    toString (): string
  
    /**
     * @function toNumber
     *
     * @description Converts MLNumber to number representation
     *
     * @return {number} - Returns number value from MLNumber object
     */
    toNumber (): number
  
    /**
     * @function toFixed
     *
     * @description Converts MLNumber to pretty string with decimal points
     *
     * @param {number} decimalPlaces - number of decimal points
     * @param roundingMode - rounding mode i.e ROUND_UP, ROUND_DOWN etc
     *
     * @return {string} - Returns pretty string value with decimal points and rounding from MLNumber object
     */
    toFixed (decimalPlaces?: number, roundingMode?: RoundingMode): string
  }
}