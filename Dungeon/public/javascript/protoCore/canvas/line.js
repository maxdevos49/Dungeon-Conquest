import Renderable from "./Renderable.js";

/**
 * @author Maxwell DeVos
 * Creates a Line that can be drawn on a canvas
 */
export default class Line extends Renderable {
    /**
     * Contructs a Triangle Shape
     * @param { Object } givenContext
     * @param { Number } givenX
     * @param { Number } givenY
     * @param { Number } givenLength
     */
    constructor(givenContext, givenX, givenY, givenLength) {
        super(givenContext, givenX, givenY);

        this.length = givenLength;
    }

    /**
     * Draws a line for the current instance onto a html canvas
     */
    draw() {
        super.draw((ctx, x, y) => {
            Line.draw(ctx, x, y, this.lineWidth + x, y);
        });
    }

    /**
     * Draws a line
     * @param {*} ctx 
     * @param {*} x 
     * @param {*} y 
     * @param {*} x2 
     * @param {*} y2 
     */
    static draw(ctx, x, y, x2, y2) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.closePath();
    }
}
