//Imports
import Shape from "./shape.js";

/**
 * @author Maxwell DeVos
 * Creates a Text shape that can be drawn on a canvas
 * @property { String } text The text the shape will have
 * @property { Number } fontSize The size of the text
 * @property { String } fontFamily The font family
 * @property { String } textAlign The text alignment
 * @property { String } textBaseline The text baseline
 * @property { String } textDirection The text direction
 */
export default class Text extends Shape {
    /**
     * Contructs a Text Shape
     * @param { Object } givenContext
     * @param { Number } givenX
     * @param { Number } givenY
     * @param { String } givenText
     */
    constructor(givenContext, givenX, givenY, givenText) {
        super(givenContext, givenX, givenY, 0, 0);

        this.text = givenText;
        this.fontSize = 20;
        this.fontFamily = "serif";
        this.textAlign = "start";
        this.textBaseline = "alphabetic";
        this.textDirection = "inherit";

        //get the proper width and height
        this.updateBounds();

    }

    /**
     * Updates the bounds of the text
     */
    updateBounds() {
        //save context
        this.context.save();
        //apply font size and type
        this.context.font = this.getFont();
        //get width
        this.width = this.context.measureText(this.text).width;
        this.height = this.fontSize;
        //restore context
        this.context.restore();
    }

    /**
     * Set the font size
     * @param { Number } givenSize The new font size
     */
    setFontSize(givenSize) {
        //change font size
        this.fontSize = givenSize;
        this.updateBounds();
    }

    /**
     * Sets the font Family
     * @param { String } givenFamily The new font family type
     */
    setFontFamily(givenFamily) {
        this.fontFamily = givenFamily;
        this.updateBounds();
    }

    /**
     * Sets the display text
     * @param { String } givenText the text to display
     */
    setText(givenText){
        this.text = givenText;
        this.updateBounds();
    }

    /**
     * Gets a text size and font family combo
     * @returns { String } A string containing the font size and family.
     */
    getFont() {
        return `${this.fontSize}px ${this.fontFamily}`;
    }

    /**
     * Draws text on a canvas
     */
    draw() {
        super.draw((ctx, x, y, width, height) => {
            //font
            ctx.font = this.getFont();

            //text align
            ctx.textAlign = this.textAlign;

            //text baseline
            ctx.textBaseline = this.textBaseline;

            //text direction
            ctx.textDirection = this.textDirection;
            
            //draw
            ctx.beginPath();
            if (this.fill) {
                ctx.fillText(this.text, x, y + height/(4/3));
            } else {
                ctx.strokeText(this.text, x, y + height/(4/3));
            }
            ctx.closePath();

        });
    }
}
