
class Coords
{
	x: number;
	y: number;

	constructor(x: number, y: number)
	{
		this.x = x;
		this.y = y;
	}

	add(other: Coords): Coords
	{
		this.x += other.x;
		this.y += other.y;
		return this;
	}

	clone(): Coords
	{
		return new Coords(this.x, this.y);
	}

	divideScalar(scalar: number): Coords
	{
		this.x /= scalar;
		this.y /= scalar;
		return this;
	}

	dotProduct(other: Coords): number
	{
		return (this.x * other.x + this.y * other.y);
	}

	magnitude(): number
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	multiplyScalar(scalar: number): Coords
	{
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	overwriteWith(other: Coords): Coords
	{
		this.x = other.x;
		this.y = other.y;
		return this;
	}

	overwriteWithXY(x: number, y: number): Coords
	{
		this.x = x;
		this.y = y;
		return this;
	}

	subtract(other: Coords): Coords
	{
		this.x -= other.x;
		this.y -= other.y;
		return this;
	}

}
