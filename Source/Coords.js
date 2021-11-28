"use strict";
class Coords {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
    clone() {
        return new Coords(this.x, this.y);
    }
    divideScalar(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    dotProduct(other) {
        return (this.x * other.x + this.y * other.y);
    }
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    multiplyScalar(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    overwriteWith(other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
    overwriteWithXY(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    subtract(other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
}
