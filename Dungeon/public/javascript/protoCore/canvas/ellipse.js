import Shape from "./shape.js";

/**
 * @author Maxwell DeVos
 * Creates a rectangle that can be drawn on a canvas
 */
export default class Ellipse extends Shape {
    /**
     * Contructs a Ellipse Shape
     * @param { Object } givenContext
     * @param { Number } givenX
     * @param { Number } givenY
     * @param { Number } givenWidth
     * @param { number } givenHeight
     */
    constructor(givenContext, givenX, givenY, givenWidth, givenHeight) {
        super(givenContext, givenX, givenY, givenWidth, givenHeight);
    }

    /**
     * Draws an Ellipse
     */
    draw() {
        super.draw((ctx, x, y, width, height) => {
            Ellipse.draw(ctx, x, y, width, height);
        });
    }

    /**
     * Draws an Ellipse on an html 5 canvas
     * @param {*} ctx The canvas context object
     * @param {*} x The horizontal position
     * @param {*} y The vertical position
     * @param {*} width The horizontal bounds
     * @param {*} height The vertical bounds
     */
    static draw(ctx, x, y, width, height){
        ctx.beginPath();
        ctx.ellipse(x + width/2, y + height/2, width/2, height/2, 0, 0, 2 * Math.PI);
        ctx.closePath();
    }
}
