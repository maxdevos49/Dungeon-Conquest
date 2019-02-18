/**
 * Vector class with its related methods
 * @author Maxwell DeVos
 * @property { Number } x The horizontal component of a vector.
 * @property { Number } y The Vertical component of a vector.
 */
export default class Vector {
    /**
     * Constructs a new Vector object using an x, y, and z component
     * @param { Number } x The starting x component of the vector
     * @param { Number } y The starting y component of the vector
     */
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Adds a given vector into the current instance
     * @param { Vector } vector
     */
    add(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError("Argument must be of type Vector.");
        }

        this.x = this.x + vector.x;
        this.y = this.y + vector.y;
    }

    /**
     * Subtracts a given vector from the current instance
     * @param { Vector } vector
     */
    sub(vector) {
        if (!(vector instanceof Vector)) {
            throw new TypeError("Argument must be of type Vector.");
        }

        this.x = this.x - vector.x;
        this.y = this.y - vector.y;
    }

    /**
     * Subtracts a given vector from another vector
     * @param { Vector } vector1
     * @param { Vector } vector2
     * @throws { TypeError } When an argument is not a vector
     * @returns { Vector } The resultant vector of subtracting two given vectors
     */
    static sub(vector1, vector2) {
        if (!(vector1 instanceof Vector)) {
            throw new TypeError("Argument must be of type Vector.");
        }

        if (!(vector2 instanceof Vector)) {
            throw new TypeError("Argument must be of type Vector.");
        }

        let x = vector1.x - vector2.x;
        let y = vector1.y - vector2.y;

        return new Vector(x, y);
    }

    /**
     * Multiplies a given vector from the current instance
     * @param { Number } scalar
     */
    mult(scalar) {
        if (typeof scalar !== "number") {
            throw new TypeError("Argument must be of type number.");
        }

        this.x = this.x * scalar;
        this.y = this.y * scalar;
    }

    /**
     * Normailze the current vector instance
     */
    normalize() {
        let magnitude = this.getMagnitude();
        this.x = this.x / magnitude;
        this.y = this.y / magnitude;
    }

    /**
     * Gets the current angle of the vector in radians
     * @returns { Number } the angle in radians
     */
    getRadians() {
        return Math.atan2(this.y , this.x);
    }

    /**
     * Gets the current angle of the vector in degrees
     * @returns { Number } angle in degrees.
     */
    getDegrees() {
        return this.getRadians() * (180 / Math.PI);
    }

    /**
     * Gets the magnitude of the current vector
     * @returns { Number } The magnitude of the current vector
     */
    getMagnitude() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    /**
     * Sets the magnitude of the current vector
     * @param { Number } givenMag the new magnitude of the vector
     * @returns { Number } The magnitude of the current vector
     */
    setMagnitude(givenMag) {
        this.normalize();
        this.mult(givenMag)
    }

    /**
     * Limits the size of the magnitude of the vector
     * @param { Number } givenLimit 
     */
    limit(givenLimit){
        let mag = this.getMagnitude();
        if(mag > givenLimit){
            this.setMagnitude(givenLimit);
        }
    }

    toString() {
        console.log(
            `Vector:\n X: ${this.x}\n Y: ${this.y}\n Magnitude: ${this.getMagnitude()}
Degrees: ${this.getDegrees()}\n Radians: ${this.getRadians()}\n`
        );
    }
}
