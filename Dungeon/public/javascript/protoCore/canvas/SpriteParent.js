import Vector from "../math/vector.js";

/**
 * @author Mason Timmerman
 * Class that holds Renderable children sprites that are rendered on an HTML 5 Canvas
 * @property { Vector } position represents the horizontal and vertical position of the object.
 * @property { Renderable } children is the array of children held by the parent that are rendered to the Canvas.
 *
 */
export default class SpriteParent {
    constructor(givenX = 0, givenY = 0) {
        //position
        this.position = new Vector(givenX, givenY);

        //array of children
        this.children = [];
    }

    addChild(givenChild) {
        givenChild.position = Vector.sub(this.position, givenChild.position);
        this.children.push(givenChild);
    }

    /**
    * Translates the parent and all of it's children the given horizontal and vertical distances.
    * @param { Number } translateX the horizontal translation. (x>0 translates right, x<0 translates left)
    * @param { Number } translateY the vertical translation. (y>0 translates down, y<0 translates up)
    * @throws { TypeError } Throws an exception if any of the two arguments are not of type Number.
    */
    translate(translateX, translateY) {
        if (typeof translateX !== "number") {
            throw new TypeError("Horizontal (x) translation must be a number.");
        }

        if (typeof translateY !== "number") {
            throw new TypeError("Vertical (y) translation must be a number.");
        }

        this.position.x += translateX;
        this.position.y += translateY;

        this.translateChildren(translateX, translateY);
    }

    /**
    * Translates the parent and all of it's children the given horizontal distance.
    * @param { Number } translateX the horizontal translation. (x>0 translates right, x<0 translates left)
    * @throws { TypeError } Throws an exception if the argument is not of type Number.
    */
    translateX(translateX) {
        if (typeof translateX !== "number") {
            throw new TypeError("Horizontal (x) translation must be a number.");
        }

        this.position.x += translateX;

        this.translateChildren(translateX, 0);
    }

    /**
    * Translates the parent and all of it's children the given vertical distance.
    * @param { Number } translateY the vertical translation. (y>0 translates down, y<0 translates up)
    * @throws { TypeError } Throws an exception if the argument is not of type Number.
    */
    translateY(translateY) {
        if (typeof translateY !== "number") {
            throw new TypeError("Vertical (y) translation must be a number.");
        }

        this.position.y += translateY;

        this.translateChildren(0, translateY);
    }

    translateChildren(translateX, translateY) {
        for(let i = 0; i < this.children.length; i++) {
            this.children[i].position.x += translateX;
            this.children[i].position.y += translateY;
        }
    }
}