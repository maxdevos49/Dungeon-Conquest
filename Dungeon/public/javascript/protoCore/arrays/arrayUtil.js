import { IllegalValueException } from "../errorHandling/IllegalValueException.js";

/**
 * Static class that contains methods to help with arrays
 * @author Maxwell DeVos
 */
export default class ArrayUtil {
    /**
     * Generates a randomly filled array based on a length and maximum number given
     * @param { Number } length
     * @param { Number } max
     * 
     * @throws TypeError
     * @throws IllegalValueException
     * 
     * @api public
     */
    static randomArray1D(length, max) {
        if (typeof length !== "number")
            throw new TypeError("length must be a number.");
        if (length <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        if (typeof max !== "number")
            throw new TypeError("length must be a number.");
        return Array(length)
            .fill()
            .map(() => Math.round(Math.random() * max));
    }

    /**
     * Generates a randomly filled 2 dimensional array based on a given column size, row size, and maximum number.
     * @param { Number } columns
     * @param { Number } rows
     * @param { Number } max
     * 
     * @throws TypeError
     * @throws IllegalValueException
     * 
     * @api public
     */
    static randomArray2D(columns, rows, max) {
        if (typeof columns !== "number")
            throw new TypeError("length must be a number.");
        if (columns <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        if (typeof rows !== "number")
            throw new TypeError("length must be a number.");
        if (rows <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        if (typeof max !== "number")
            throw new TypeError("length must be a number.");

        let array = [];
        for (let i = 0; i < columns; i++) {
            array[i] = this.randomArray1D(rows, max);
        }

        return array;
    }

    /**
     * Generates a filled array based on a length and a number given
     * @param { Number } length
     * @param { Number } num
     * 
     * @throws TypeError
     * @throws IllegalValueException
     * 
     * @api public
     */
    static array1D(length, num) {
        if (typeof length !== "number")
            throw new TypeError("length must be a number.");
        if (length <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        return Array(length)
            .fill()
            .map(() => num);
    }

    /**
     * Generates a filled 2 dimensional array based on a given column size, row size, and a number.
     * @param { Number } columns
     * @param { Number } rows
     * @param { Number } num
     * 
     * @throws TypeError
     * @throws IllegalValueException
     * 
     * @api public
     */
    static array2D(columns, rows, num) {
        if (typeof columns !== "number")
            throw new TypeError("length must be a number.");
        if (columns <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        if (typeof rows !== "number")
            throw new TypeError("length must be a number.");
        if (rows <= 0)
            throw new IllegalValueException("Length must be greater then 0.");

        let array = [];
        for (let i = 0; i < columns; i++) {
            array[i] = this.array1D(rows, num);
        }

        return array;
    }
}
