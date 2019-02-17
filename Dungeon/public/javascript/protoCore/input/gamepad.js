//imports
import { IllegalValueException } from "../errorHandling/IllegalValueException.js";

/**
 * Class to help with the gamepad
 * @author Maxwell DeVos
 */
export default class GamePad {
    /**
     * Indicates whether gamepads are supported in the current browser
     * @returns { Boolean } true if the browser supports controllers. otherwise false
     * @api public
     */
    static controllerSupport() {
        return "getGamepads" in navigator;
    }

    /**
     * Indicates whether or not atleast 1 controller in connected
     * @returns { Boolean } true if 1 or more controllers are connected. otherwise false
     * @api public
     */
    static controllerConnected() {
        if (this.controllerSupport()) {
            if (navigator.getGamepads()[0]) {
                //might not always be true but we will see for now
                return true;
            }
        }
        return false;
    }

    /**
     * Gets the amount of controllers currently connected
     * @returns { Number } the amount of controllers connected
     * @api public
     */
    static controllerCount() {
        var gamepad = navigator.getGamepads();
        let count = 0;

        if (gamepad) {
            for (let i = 0; i < gamepad.length; i++) {
                if (gamepad[i] != null) count++;
            }

            return count;
        }

        return 0;
    }

    /**
     * Retrieves the given array of buttons and their respective values
     *
     * @param { Number } index Optional argument to determine what controller
     * you want. Defaults to the the first controller or index 0.
     *
     * @throws TypeError
     * @throws IllegalValueException
     *
     * @returns { Array } the given set of buttons for a specified index
     * @api public
     */
    static getButtons(index = 0) {
        if (typeof index !== "number")
            throw new TypeError("Index must be a number");
        if (index < 0)
            throw new IllegalValueException("Index must be a number above 0");

        var gamepad = navigator.getGamepads();

        return gamepad[index].buttons;
    }

    /**
     * Retrieves the given array of Axes and their respective values
     *
     * @param { Number } index Optional argument to determine what controller
     * you want. Defaults to the the first controller or index 0.
     *
     * @throws TypeError
     * @throws IllegalValueException
     *
     * @returns { Array } the given set of axes for a specified controller index
     * @api public
     */
    static getAxes(index = 0) {
        if (typeof index !== "number")
            throw new TypeError("Index must be a number");
        if (index < 0)
            throw new IllegalValueException("Index must be a number above 0");

        var gamepad = navigator.getGamepads();

        return gamepad[index].axes;
    }
}
