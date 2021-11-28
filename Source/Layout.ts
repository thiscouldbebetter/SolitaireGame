
class Layout
{
	cardStacks: CardStack[];
	cardStacksByName: Map<string, CardStack>;

	constructor(cardStacks: CardStack[])
	{
		this.cardStacks = cardStacks;
		this.cardStacksByName =
			new Map(this.cardStacks.map(x => [x.name, x] ) );
	}

	cardStackByName(name: string): CardStack
	{
		return this.cardStacksByName.get(name);
	}
}
