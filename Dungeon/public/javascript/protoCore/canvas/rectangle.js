import Shape from "./shape.js";

/**
 * @author Maxwell DeVos
 * Creates a rectangle that can be drawn on a canvas
 */
export default class Rectangle extends Shape{
    
    /**
     * Contructs a Rectangle Shape
     * @param { Object } givenContext 
     * @param { Number } givenX 
     * @param { Number } givenY 
     * @param { Number } givenWidth 
     * @param { number } givenHeight 
     */
    constructor(givenContext, givenX, givenY, givenWidth, givenHeight){
        super(givenContext, givenX, givenY, givenWidth, givenHeight);
    }

    /**
     * Draws a rectangle
     */
    draw(){
        super.draw((ctx, x, y, width, height) => {
            Rectangle.draw(ctx, x, y, width, height);
        })
    }

    /**
     * Draws a Rectangle
     * @param { Object } ctx The canvas drawing context
     * @param { Number } x The horizontal position
     * @param { Number } y The Vertical postition
     * @param { Number } width The horizontal bounds
     * @param { Number } height The vertical bounds
     */
    static draw(ctx, x, y, width, height){
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(width + x, y);
        ctx.lineTo(width + x, height + y);
        ctx.lineTo(x, height + y);
        ctx.closePath();
    }

}