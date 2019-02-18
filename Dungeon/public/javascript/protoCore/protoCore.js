//Imports
import { IllegalValueException } from "./errorHandling/IllegalValueException.js";
import toggleFullScreen from "./input/fullscreen.js";

/**
 * Creates a canvas prototyping project
 * @author Maxwell DeVos
 */
export default class protoCore {
    /**
     * Initilizes the canvas project object
     * @param {Object} givenOptions
     */
    constructor(givenOptions) {
        //Canvas Size
        this.canvasWidth = givenOptions.width || 1200;
        this.canvasHeight = givenOptions.height || 700;

        //Canvas element
        this._targetId = givenOptions.targetId || "canvas";
        this._canvas = document.getElementById(this._targetId);
        this._fullScreenId = givenOptions.fullScreenId || false;
        //Apply settings to canvas
        this._setupUI();

        //Get canvas drawing context
        this._context = this._canvas.getContext("2d");

        //Lifecycle functions
        this._setup = givenOptions.setup;
        this._update = givenOptions.update;
        this._draw = givenOptions.draw;
        this._keyDown = givenOptions.keyDown || false;
        this._keyUp = givenOptions.keyUp || false;

        //Animation settings
        this._framerate = givenOptions.framerate || 60;
        this._rate = 1000 / this._framerate;
        this.looping = false;
        this.autoStart = givenOptions.autoStart || true;
        this._interval = null;

        this._setup(this._canvas, this._context);

        if (this.autoStart) {
            this.start();
        }
    }

    /**
     * Setup Canvas based on the given options
     * @api private
     */
    _setupUI() {
        this._canvas.width = this.canvasWidth;
        this._canvas.height = this.canvasHeight;

        //setup full screen
        if (this._fullScreenId) {
            let trigger = document.getElementById(this._fullScreenId);
            trigger.addEventListener("click", () => this.fullScreen());
        }

        this.keyDownListener = window.addEventListener("keydown", e => {
            if (this._keyDown) {
                this._keyDown(e);
            } else {
                e.preventDefault();
                switch (e.keyCode) {
                    case 70:
                        this.fullScreen();
                        break;
                    case 82:
                        this.reset();
                        break;
                    default:
                        break;
                }
            }
        });

        this.keyUpListener = window.addEventListener("keyup", e => {
            if (this._keyDown) {
                this._keyUp(e);
            }
        });
    }

    /**
     * Starts the canvas animation loop
     * @api public
     */
    start() {
        if (!this.looping) {
            this.looping = true;

            //Get proper requestAnimationFrame
            var requestAnimationFrame =
                window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;

            this._animationFrameId = requestAnimationFrame(now =>
                this.loop(now)
            );
        }
    }

    /**
     * Stops the canvas animation loop
     * @api public
     */
    stop() {
        this.looping = false;
        cancelAnimationFrame(this._animationFrameId);
    }

    /**
     * Resets the entire project
     * @api public
     */
    reset() {
        this.stop();
        removeEventListener(this.keyDownListener);
        removeEventListener(this.keyUpListener);
        this._setup(this._canvas, this._context);
        this.start();
    }

    /**
     * Updates the framerate of the current animation
     * @param { Number } value
     * @throws TypeError if value is not an number
     * @throws IllegalValueException if value is not within a valid range of 0 and 60
     * @api public
     */
    set framerate(value) {
        if (typeof value !== "number")
            throw new TypeError("Framerate must be a number.");

        if (value < 0)
            throw new IllegalValueException(
                "Framerate can only be set to a value between 0 and 60."
            );

        this._framerate = value;
        this._rate = 100 / this._framerate;

        if (this.looping) {
            this.stop();
            this.start();
        }
    }
    /**
     * Calls all needed methods for a single cycle
     * @param { Number } now
     * @api private
     */
    loop(now) {
        if (this.looping) {
            if (!this._then) this._then = now;
            var requestAnimationFrame =
                window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            //request next frame
            requestAnimationFrame(now => this.loop(now));

            let delta = now - this._then;

            //only draw for the desired framerate
            if (delta > this._rate) {
                this._then = now - (delta % this._rate);

                this._update(this._canvas);
                this._draw(this._context, this._canvas);
            }
        }
    }

    /**
     * Gets the current framerate
     * @api public
     */
    get framerate() {
        return this._framerate;
    }
    /**
     * Gets the canvas element context
     * @api public
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * Gets the canvas elements drawing context
     * @api public
     */
    getContext() {
        return this._context;
        // Jeff was here, ayy lmao
    }

    /**
     * Toggles the canvas to be full screen or not. Due to security and
     * to prevent abuse this method will only work from a direct interaction
     * from a user such as a key, mouse, or button event
     * @api public
     */
    fullScreen() {
        toggleFullScreen(this._canvas);
    }
}
