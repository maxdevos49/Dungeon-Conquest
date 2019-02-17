import Vector from "../math/vector.js";
/**
 * @author Maxwell DeVos
 * Base class for rendering objects and shapes to the HTML 5 Canvas
 * @property { Object } context The HTML 5 Drawing context
 * @property { Number } x represents the horizontal position of the renderable object.
 * @property { Number } y represents the vertical postion of the renderable object.
 * @property { Vector } anchor Represents the point of rotation for the renderable object.
 * @property { Number } rotation Indicates the current roatation of the renderable object.
 * @property { Number } globalOpacity Indicates the current opacity of the object.
 * @property { Number } lineWidth Indicates the line width of strokes.
 * @property { String } fillStyle Indicates the fillstyle color.
 * @property { Boolean } fill Indicates whether to fill or not.
 * @property { String } strokeStyle Indicates the strokestyle color.
 * @property { Boolean } stroke Indicates whether to draw the stroke or not.
 * @property { Boolean } ignoreScreenBounds Indicates whether to draw the shape if it is outside of the canvas frame.
 * @property { Boolean } shown Indicates whether the shape should be drawn or not.
 *
 */
export default class Renderable {
    /**
     * Creates a new instance of a Renderable object. This class recieves a Canvas
     * rendering context object and a x position and y position.
     * @param { Object } givenContext The canvas rendering context
     * @param { Number } [givenX=0] The starting x position
     * @param { Number } [givenY=0] The starting y position
     */
    constructor(givenContext, givenX = 0, givenY = 0) {
        this.context = givenContext;

        //positioning
        this.position = new Vector(givenX, givenY);
        this.anchor = new Vector(0, 0);

        //context state properties
        this.rotation = 0;
        this.globalOpacity = 1;
        this.lineWidth = 1;

        //fill
        this.fillStyle = "black";
        this.fill = true;

        //stroke
        this.strokeStyle = "black";
        this.stroke = true;

        //drawing state properties
        this.ignoreScreenBounds = false;
        this.shown = true;

        //TODO
        // this.miterLimit = 10.0;
        // this.getLineDash();
        // this.setLineDash(segments);
        // this.lineDashOffset = 0.0;
        // this.lineCap = "butt";
        // this.lineJoin = "miter";
        // gradients
    }

    set x(givenX) {
        this.position.x = givenX;
    }

    get x() {
        return this.position.x;
    }

    set y(givenY) {
        this.position.y = givenY;
    }

    get y() {
        return this.position.y;
    }

    /**
     * Sets the anchor point for the the current renderable object to be drawn around
     * @param { Number } givenX the horizontal rotation point.
     * @param { Number } givenY the vertical rotation point.
     * @throws { TypeError } Throws an exception if any of the two arguments are not of type Number.
     */
    setAnchor(givenX, givenY) {
        if (typeof givenX !== "number") {
            throw new TypeError("Anchor x position must be a number.");
        }

        if (typeof givenY !== "number") {
            throw new TypeError("Anchor y position must be a number.");
        }

        this.anchor.x = givenX;
        this.anchor.y = givenY;
    }

    /**
     * Rotates the renderable object by the given angle. The default unit is degrees
     * but can be changed to radians by supplying an optional boolean value
     * @param { Number } givenAngle
     * @param { Boolean } [isRadians=false]
     * @throws { TypeError } Throws an exception if the given angle is not a valid Number.
     */
    rotate(givenAngle, isRadians = false) {
        if (typeof givenAngle !== "number") {
            throw new TypeError("The angle must be a valid number.");
        }

        if (isRadians) {
            //radians
            this.rotation += givenAngle;
        } else {
            //degrees
            this.rotation += givenAngle * (Math.PI / 180);
        }
    }

       /**
     * Rotates the renderable object to the given angle. The default unit is degrees
     * but can be changed to radians by supplying an optional boolean value
     * @param { Number } givenAngle
     * @param { Boolean } [isRadians=false]
     * @throws { TypeError } Throws an exception if the given angle is not a valid Number.
     */
    setRotation(givenAngle, isRadians = false) {
        if (typeof givenAngle !== "number") {
            throw new TypeError("The angle must be a valid number.");
        }

        if (isRadians) {
            //radians
            this.rotation = givenAngle;
        } else {
            //degrees
            this.rotation = givenAngle * (Math.PI / 180);
        }
    }

    /**
     * Sets the opacity of the renderable object. The valid range is between
     * 1 and 0 where 1 is opaque and 0 is clear.
     * @param { Number } givenOpacity The opacity value.
     * @throws { TypeError } Throws an exception if the givenOpacity is not a valid Number.
     */
    setOpacity(givenOpacity) {
        if (typeof givenOpacity !== "number") {
            throw new TypeError("The given opacity must be a valid Number");
        }
        this.globalOpacity = givenOpacity;
    }

    /**
     * Sets the lineWidth of the stroke
     * @param { Number } givenWidth
     * @throws { TypeError } Throws an exception if the given width is not a valid Number.
     */
    setLineWidth(givenWidth) {
        if (typeof givenWidth !== "number") {
            throw new TypeError("The given width must be a valid Number");
        }
        this.lineWidth = givenWidth;
    }

    /**
     * Sets the state of the renderable object to not be drawn on the screen.
     */
    hide() {
        this.shown = false;
    }

    /**
     * Sets the state of the renderable object to be drawn on the screen.
     */
    show() {
        this.shown = true;
    }

    /**
     * Sets the state to not fill in the renderable object.
     */
    noFill() {
        this.fill = false;
    }

    /**
     * Sets the state to fill in the renderable object
     */
    fill() {
        this.fill = true;
    }

    /**
     * Sets the state to not stroke in the renderable object.
     */
    noStroke() {
        this.stroke = false;
    }

    /**
     * Sets the state to stroke in the renderable object
     */
    stroke() {
        this.stroke = true;
    }

    /**
     * Sets the color of fill of the renderable object
     * @param { String } givenColor the color of the fill style
     */
    setFillStyle(givenColor) {
        this.fillStyle = givenColor;
    }

    /**
     * Sets the color of stroke of the renderable object
     * @param { String } givenColor the color of the stroke style
     */
    setStrokeStyle(givenColor) {
        this.strokeStyle = givenColor;
    }

    /**
     * draw implements some of the basic actions needed for drawing a renderable object to the canvas
     * @param { Function } drawingInstructions The instructions on what to actualy draw
     */
    draw(drawingInstructions) {
        //check to show the shape or nor
        if (this.shown) {
            let x = -this.anchor.x;
            let y = -this.anchor.y;
            let ctx = this.context;
            //save current context
            ctx.save();

            //fill
            ctx.fillStyle = this.fillStyle;

            //stroke
            ctx.strokeStyle = this.strokeStyle;

            //opacity
            ctx.globalAlpha = this.globalOpacity;

            //lineWidth
            ctx.lineWidth = this.lineWidth;

            //translate
            ctx.translate(this.x - x, this.y - y);

            //rotate
            ctx.rotate(this.rotation);

            //Call the custom drawing
            drawingInstructions(ctx, x, y);

            //stroke
            if (this.stroke) {
                ctx.stroke();
            }

            //fill
            if (this.fill) {
                ctx.fill();
            }

            //restore context to previous state
            ctx.restore();
        }
    }
}
