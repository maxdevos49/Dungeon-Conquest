import Rectangle from "./rectangle.js";
import SpriteParent from "./SpriteParent.js";

/**
 * @author Mason Timmerman
 * Tiles for the dungeon map are generated, stored, and drawn.
 * @property { Number } map 2D array of integers that represent tile IDs.
 * @property { Renderable } tiles tiles to be rendered as tiles of the map.
 * @property { SpriteParent } mapParent the parent to all tiles in the map.
 * @property { Number } tileSize the height and with of the tiles (they are square).
 * @property { Number } width the width of the map.
 * @property { Number } height the height of the map.
 *
 */
export default class TileMap {
    /**
     * Creates an that stores the tiles and other values for the map.
     * @param { Object } context the canvas rendering context
     * @param { Number } mapArray the array storing tile IDs.
     * @param { Number } tileSize the square size of each tile.
     * @param { Number } givenWidth the width given to the map.
     * @param { Number } givenHeight the height given to the map.
     */
    constructor(context, mapArray, tileSize, givenWidth, givenHeight) {
        //2D array of integers storing tile IDs
        this.map = mapArray;

        //array of tiles
        this.tiles = [];

        //the map parent
        this.mapParent = new SpriteParent(0, 0);

        for (let i = 0; i < givenHeight; i++) {
            let temp = [];
            for (let j = 0; j < givenWidth; j++) {
                temp[j] = new Rectangle(context, j * tileSize, i * tileSize, tileSize, tileSize);
                temp[j].setFillStyle(`rgb(${this.map[i][j] * 25}, ${this.map[i][j] * 25}, ${this.map[i][j] * 25})`);
                temp[j].fill = true;
                this.mapParent.addChild(temp[j]);
            }
            this.tiles.push(temp);
        }

        //size of the tiles
        this.tileSize = tileSize;

        //map dimensions
        this.width = givenWidth;
        this.height = givenHeight;
    }

    /**
     * Draws each tile of the map
     */
    draw() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                this.tiles[i][j].draw();
            }
        }
    }
}