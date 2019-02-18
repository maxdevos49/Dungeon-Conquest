/**
 * @author Mason Timmerman
 * Class that represents a child sprite of the SpriteParent class
 * @property { Vector } position is the position of this child relative to the parent.
 * @property { SpriteChild } sprite is the sprite that will be rendered to the Canvas
 *
 */
export default class SpriteChild {
    /**
     * Creates an instance of the SpriteChild with a given renderable sprite and position.
     * @param { Renderable } givenSprite 
     * @param { Number } relativePosition 
     */
    constructor(givenSprite, relativePosition) {
        //relative position to parent
        this.position = relativePosition;

        //this child's sprite
        this.sprite = givenSprite;
    }
}