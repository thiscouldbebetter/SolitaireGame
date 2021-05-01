
class Rank
{
	constructor(value, code)
	{
		this.value = value;
		this.code = code;
	}

	static _instance;
	static Instances()
	{
		if (Rank._instances == null)
		{
			Rank._instances = new Rank_Instances();
		}
		return Rank._instances;
	}
}

class Rank_Instances
{
	constructor()
	{
		this._All =
		[
			new Rank(0, "A "),
			new Rank(1, "2 "),
			new Rank(2, "3 "),
			new Rank(3, "4 "),
			new Rank(4, "5 "),
			new Rank(5, "6 "),
			new Rank(6, "7 "),
			new Rank(7, "8 "),
			new Rank(8, "9 "),
			new Rank(9, "10 "),
			new Rank(10, "J "),
			new Rank(11, "Q "),
			new Rank(12, "K "),
		];

		this._All.addLookups("code");
	}
}
