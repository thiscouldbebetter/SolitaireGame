
class Layout
{
	constructor(cardStacks)
	{
		this.cardStacks = cardStacks;
		this.cardStacks.addLookups("name");
	}
}
