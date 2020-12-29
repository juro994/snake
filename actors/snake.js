import Actor from './actor.js';

class Snake extends Actor {

    static SNAKE_ELEMENT_SIZE = 30;

    segments = [];

    constructor(position){
        super(position);
        this._addSegment(position);
    }

    setPosition({x, y}) {
        this.position = {x: x, y: y};
        this._addSegment({x: x, y: y});
    }

    _addSegment({x, y}) {
        this.segments.push({x, y});
    }

    cutTailSegment() {
        this.segments.splice(0, 1);
    }

    getSegments() {
        return this.segments;
    }

    getSegmentsWithoutHead() {
        return this.segments.slice(0, this.segments.length-1)
    }

}

export default Snake;