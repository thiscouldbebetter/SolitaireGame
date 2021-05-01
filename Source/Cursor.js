
class Cursor
{
	constructor()
	{
		this.cardStackIndexSelected = 0;
		this.numberOfCardsSelected = 0;
		this.cardStackBeingMoved = null;
		this.cardStackBeingMovedFrom = null;
	}

	cardStackSelectNextInDirection(layout, directionSpecified)
	{
		var stackCurrent = this.cardStackSelected();
		var indexOfBestStackSoFar = null;
		var displacementToStackOther = new Coords();
		var directionToStackOther = new Coords();
		var qualityScoreLeastSoFar = Number.POSITIVE_INFINITY; // Less is better.

		var stacks = layout.cardStacks;
		for (var i = 0; i < stacks.length; i++)
		{
			var stackOther = stacks[i];
			if (stackOther != stackCurrent)
			{
				displacementToStackOther.overwriteWith
				(
					stackOther.pos
				).subtract
				(
					stackCurrent.pos
				);

				var distanceToStackOther = displacementToStackOther.magnitude();

				directionToStackOther.overwriteWith
				(
					displacementToStackOther
				).divideScalar
				(
					distanceToStackOther
				);

				var dotProduct = directionToStackOther.dotProduct
				(
					directionSpecified
				);

				if (dotProduct > 0)
				{
					var dotProductReversed = 1 - dotProduct;
					if (dotProductReversed == 0)
					{
						dotProductReversed = .001;
					}
					var qualityScore = distanceToStackOther * dotProductReversed;
					if (qualityScore < qualityScoreLeastSoFar)
					{
						qualityScoreLeastSoFar = qualityScore;
						indexOfBestStackSoFar = i;
					}
				}
			}
		}

		if (indexOfBestStackSoFar != null)
		{
			this.cardStackIndexSelected = indexOfBestStackSoFar;
			this.numberOfCardsSelected = 0;
		}
	}

	cardStackSelected()
	{
		var returnValue = null;

		if (this.cardStackIndexSelected != null)
		{
			var universe = Globals.Instance.universe;
			var cardStacks = universe.session.layout.cardStacks;
			returnValue = cardStacks[this.cardStackIndexSelected];
		}

		return returnValue;
	}

	cardStackSelectedTakeOrDrop()
	{
		var cardStackSelected = this.cardStackSelected();
		if (cardStackSelected != null)
		{
			if (this.cardStackBeingMoved == null)
			{
				if (cardStackSelected.cards.length == 0)
				{
					// hack - False drop.

					var defn = cardStackSelected.defn();
					defn.dropCardStackFromCursorOnto(this, cardStackSelected);
				}
				else if (this.numberOfCardsSelected > 0)
				{
					// take

					this.cardStackBeingMovedFrom = cardStackSelected;
					this.cardStackBeingMoved = cardStackSelected.drawCardsAsCardStack
					(
						this.numberOfCardsSelected
					);
					this.numberOfCardsSelected = 0;
				}
			}
			else
			{
				// drop

				var defn = cardStackSelected.defn();
				defn.dropCardStackFromCursorOnto(this, cardStackSelected);
			}
		}
	}

	dropCardStackBeingMovedOntoOther(cardStackSelected)
	{
		cardStackSelected.add(this.cardStackBeingMoved);
		this.cardStackBeingMoved = null;
		this.numberOfCardsSelected = 0;

		if (this.cardStackBeingMovedFrom.defn().showTopCardAfterMove == true)
		{
			this.cardStackBeingMovedFrom.showTopCard();
		}
		this.cardStackBeingMovedFrom = null;
	}

	cardStackSelectedDeselect()
	{
		if (this.cardStackBeingMoved != null)
		{
			this.cardStackBeingMovedFrom.add(this.cardStackBeingMoved);
			this.cardStackBeingMoved = null;
			this.cardStackBeingMovedFrom = null;
			this.numberOfCardsSelected = 0;
		}
	}

	cardStackSelectionCountAdd(offset)
	{
		if
		(
			this.cardStackIndexSelected != null
			&& this.cardStackBeingMoved == null
		)
		{
			var cardStackSelected = this.cardStackSelected();
			var numberOfCardsInStack = cardStackSelected.cards.length;
			var numberOfCardsSelectedNext = this.numberOfCardsSelected + offset;
			if
			(
				numberOfCardsSelectedNext >= 0
				&& numberOfCardsSelectedNext <= numberOfCardsInStack
			)
			{
				this.numberOfCardsSelected += offset;
			}

			var cardStackSelectedDefn = cardStackSelected.defn();
			var cardsSelectableMax = cardStackSelectedDefn.cardsSelectableMax;
			if
			(
				cardsSelectableMax != null
				&& this.numberOfCardsSelected > cardsSelectableMax
			)
			{
				this.numberOfCardsSelected = cardsSelectableMax;
			}

			if (cardStackSelectedDefn.areFaceDownCardsSelectable == false)
			{
				while (this.numberOfCardsSelected > 0)
				{
					var indexOfFirstCardToSelect = numberOfCardsInStack - this.numberOfCardsSelected;
					var cardToSelect = cardStackSelected.cards[indexOfFirstCardToSelect];
					if (cardToSelect.isFaceUp == true)
					{
						break;
					}
					this.numberOfCardsSelected--;
				}
			}
		}
	}
}
