import Renderable from "./Renderable.js";

/**
 * This class contains all of the basic operations and
 * attributes all shapes have. This class can be extended to create
 * other shapes and is not intended to be used directly.
 * @author Maxwell DeVos
 * @property { Number } width The horizontal bounds of the shape.
 * @property { Number } height The vertical bounds of the shape.
 * @property { Boolean } bounds A Boolean property to tell if the bounds of the shape should be drawn.
 */
export default class Shape extends Renderable {
    /**
     * Contructs a Abstact shape
     * @param { Object } givenContext
     * @param { Number } givenX
     * @param { Number } givenY
     * @param { Number } givenWidth
     * @param { Number } givenHeight
     */
    constructor(givenContext, givenX, givenY, givenWidth, givenHeight) {
        super(givenContext, givenX, givenY);

        this.width = givenWidth;
        this.height = givenHeight;

        this.bounds = false;
    }

    // /**
    //  * Checks whether the shape is on the screen
    //  * @returns { Boolean } true if part is on the screen
    //  */
    // isOnScreen() {
    //     let result = true;
    //     //check whether to actually check for offscreen shapes
    //     if (!this.ignoreScreenBounds) {
    //         //width and height of canvas
    //         let width = this._context.canvas.width;
    //         let height = this._context.canvas.height;

    //         if (this.x > width + this.width) {
    //             result = false;
    //         } else if (this.x < 0 - this.width) {
    //             result = false;
    //         } else if (this.y > height - this.height) {
    //             result = false;
    //         } else if (this.y < 0 - this.height) {
    //             result = false;
    //         }
    //     }

    //     return result;
    // }

    /**
     * Draws a shape and applies all the drawing attributes set for the shape
     * @param { Function } drawingInstructions A function that contains a
     */
    draw(drawingInstructions) {
        super.draw((ctx, x, y) => {
            let width = this.width;
            let height = this.height;

            if (this.bounds) {
                ctx.save();
                //Bounding Box
                ctx.globalAlpha = 1;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.strokeRect(x, y, width, height);
                ctx.closePath();
                ctx.restore();

                // Anchor point
                ctx.save();
                ctx.fillStyle = "red";
                ctx.globalAlpha = 1;
                ctx.beginPath();
                ctx.ellipse(0, 0, 5, 5, 0, 0, 2 * Math.PI);
                ctx.fill();
                ctx.closePath();
                ctx.restore();
            }

            drawingInstructions(ctx, x, y, width, height);
        });
    }
    /**
     * Shows the bounding box around a shape
     */
    showBounds() {
        this.bounds = true;
    }

    /**
     * Hides a bounding box around a shape
     */
    hideBounds() {
        this.bounds = true;
    }
}
