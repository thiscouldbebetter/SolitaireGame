
function CardStack(name, defnName, pos, cards)
{
	this.name = name;
	this.defnName = defnName;
	this.pos = pos;
	this.cards = cards;
}

{
	// static methods

	CardStack.fromCardDefns = function(name, defnName, pos, cardDefns)
	{
		var cards = [];

		for (var i = 0; i < cardDefns.length; i++)
		{
			var cardDefn = cardDefns[i];
			var card = new Card(cardDefn.name, false);
			cards.push(card);
		}

		var returnValue = new CardStack
		(
			name,
			defnName,
			pos,
			cards
		);

		return returnValue;
	}

	// instance methods

	CardStack.prototype.add = function(other)
	{
		this.cards.append(other.cards);
	}

	CardStack.prototype.defn = function()
	{
		return Globals.Instance.universe.gameDefn.cardStackDefns[this.defnName];
	}

	CardStack.prototype.drawCards = function(numberOfCardsToDraw, isFaceUp)
	{
		var returnValues = [];

		for (var i = 0; i < numberOfCardsToDraw; i++)
		{
			var cardIndex = this.cards.length - 1;
			var card = this.cards[cardIndex];
			card.isFaceUp = isFaceUp;
			this.cards.splice(cardIndex, 1);
			returnValues.splice(0, 0, card);
		}

		return returnValues;
	}

	CardStack.prototype.drawCardsFaceDown = function(numberOfCardsToDraw)
	{
		return this.drawCards(numberOfCardsToDraw, false);
	}

	CardStack.prototype.drawCardsFaceUp = function(numberOfCardsToDraw)
	{
		return this.drawCards(numberOfCardsToDraw, true);
	}

	CardStack.prototype.drawCardsAsCardStack = function(numberOfCardsToDraw)
	{
		var cardsDrawn = this.drawCardsFaceUp(numberOfCardsToDraw);

		var returnValue = new CardStack
		(
			this.name + "_Draw" + numberOfCardsToDraw,
			this.defnName,
			new Coords(0, 0), // pos,
			cardsDrawn
		);

		return returnValue;
	}

	CardStack.prototype.flip = function()
	{
		for (var i = 0; i < this.cards.length; i++)
		{
			var card = this.cards[i];
			card.isFaceUp = (card.isFaceUp == false);
		}

		return this;
	}

	CardStack.prototype.reverse = function()
	{
		var numberOfCards = this.cards.length;

		for (var i = numberOfCards - 1; i >= 0; i--)
		{
			var card = this.cards[i];
			this.cards.push(card);
		}

		this.cards.splice(0, numberOfCards);

		return this;
	}

	CardStack.prototype.showTopCard = function()
	{
		if (this.cards.length > 0)
		{
			this.cards[this.cards.length - 1].isFaceUp = true;
		}
	}

	CardStack.prototype.size = function()
	{
		var numberOfCards = this.cards.length;
		var numberOfCardsMinusOne = numberOfCards - 1;
		if (numberOfCardsMinusOne < 0)
		{
			numberOfCardsMinusOne = 0;
		}

		var returnValue = this.defn().spacing.clone().multiplyScalar
		(
			numberOfCardsMinusOne
		).add
		(
			this.defn().cardDefnSet().cardSizeInPixels
		);

		return returnValue;
	}

	CardStack.prototype.shuffle = function()
	{
		var cardsToShuffle = this.cards;
		var cardsShuffled = [];

		while (cardsToShuffle.length > 0)
		{
			var cardIndexRandom = Math.floor
			(
				Math.random() * cardsToShuffle.length
			);
			var cardRandom = cardsToShuffle[cardIndexRandom];
			cardsToShuffle.splice(cardIndexRandom, 1);
			cardsShuffled.push(cardRandom);
		}

		this.cards = cardsShuffled;

		return this;
	}

	CardStack.prototype.topCard = function()
	{
		var returnValue = null;

		if (this.cards.length > 0)
		{
			returnValue = this.cards[this.cards.length - 1];
		}

		return returnValue;
	}

	CardStack.prototype.topCardsAsCardStack = function(numberOfCardsToTake)
	{
		var numberOfCardsTotal = this.cards.length;
		var numberOfCardsToLeave = numberOfCardsTotal - numberOfCardsToTake;
		var spacingMultiplier = numberOfCardsToLeave;
		if (numberOfCardsToTake == 0 && numberOfCardsTotal > 0)
		{
			spacingMultiplier--;
		}
		else
		{
			// do nothing
		}

		var topCards = this.cards.slice(numberOfCardsToLeave);

		var returnValue = new CardStack
		(
			this.name + "_Top" + numberOfCardsToTake,
			this.defnName,
			this.pos.clone().add
			(
				this.defn().spacing.clone().multiplyScalar
				(
					spacingMultiplier
				)
			),
			topCards
		);

		return returnValue;
	}
}
