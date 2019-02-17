import Shape from "./shape.js";

/**
 * @author Maxwell DeVos
 * Creates a triangle that can be drawn on a canvas
 */
export default class Triangle extends Shape {
    /**
     * Contructs a Triangle Shape
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
     * Draws a Triangle.
     */
    draw() {
        super.draw((context, x, y, width, height) => {
            Triangle.draw(context, x, y, width, height);
        });
    }

    /**
     * Draws a Triangle.
     * @param { Object } context A canvas drawing context
     * @param { Number } x The horizontal placement
     * @param { Number } y The vertical placement
     * @param { Number } width The horizontal bounds of the shape
     * @param { Number } height The vertical bounds of the shape
     */
    static draw(context, x, y, width, height) {
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + width, y);
        context.lineTo(x + width / 2, y + height);
        context.closePath();
    }
}
