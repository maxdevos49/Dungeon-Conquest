/**
 * Makes retrieving input from the keyboard super easy
 * //Depreciating
 * @author Maxwell DeVos
 */
export default class Keyboard {
    /**
     * Sets up the instance
     */
    constructor() {
        this._pressed = false;
        this._up = false;
        this._down = false;

        this._keyPressed = null;
        this._keyUp = null;
        this._keyDown = null;

        window.addEventListener("keypress", e => {
            e.preventDefault();

            this._pressed = true;
            this._keyPressed = e.keyCode;
        });

        window.addEventListener("keydown", e => {
            e.preventDefault();

            this._down = true;
            this._keyDown = e.keyCode;
        });

        window.addEventListener("keyup", e => {
            e.preventDefault();

            this._up = true;
            this._keyUp = e.keyCode;
        });
    }

    /**
     * Indicates if a key was pressed
     * @returns { Boolean }
     * @api public
     */
    pressed() {
        return this._pressed;
    }

    /**
     * Returns the key that was last pressed
     * @returns { Number }
     * @api public
     */
    keyPress() {
        this._pressed = false;
        return this._keyPressed;
    }

    /**
     * Indicates if a key was released
     * @return { Boolean }
     * @api public
     */
    up() {
        return this._up;
    }

    /**
     * Returns the last key that was released
     * @returns  { Number }
     * @api public
     */
    keyUp() {
        this._up = false;
        return this._keyUp;
    }

    /**
     * Indicates if a key is down
     * @returns { Boolean }
     * @api public
     */
    down() {
        return this._down;
    }

    /**
     * Returns the last key pressed down
     * @returns { Boolean }
     * @api public
     */
    keyDown() {
        this._down = false;
        return this._keyDown;
    }
}
