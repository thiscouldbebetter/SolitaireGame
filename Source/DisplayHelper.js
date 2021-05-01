
class DisplayHelper
{
	clear()
	{
		this.graphics.fillStyle = "White";
		this.graphics.fillRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);

		this.graphics.strokeStyle = "LightGray";
		this.graphics.strokeRect
		(
			0, 0,
			this.viewSizeInPixels.x,
			this.viewSizeInPixels.y
		);
	}

	drawCardAtPos(card, pos)
	{
		var cardDefn = card.defn();
		var cardSizeInPixels = card.size();
		var isFaceUp = card.isFaceUp;

		if (isFaceUp == true)
		{
			this.graphics.fillStyle = "White";
		}
		else
		{
			this.graphics.fillStyle = "Gray";
		}

		this.graphics.fillRect
		(
			pos.x, pos.y,
			cardSizeInPixels.x, cardSizeInPixels.y
		);

		this.graphics.strokeStyle = "LightGray";
		this.graphics.strokeRect
		(
			pos.x, pos.y,
			cardSizeInPixels.x, cardSizeInPixels.y
		);

		if (isFaceUp == true)
		{
			this.graphics.fillStyle = cardDefn.color;
			this.graphics.fillText(cardDefn.name, pos.x, pos.y + 10);
		}
	}

	drawCardStack(cardStack)
	{
		var drawPos = cardStack.pos.clone();

		var cardStackDefn = cardStack.defn();
		var cards = cardStack.cards;

		var cardDefnSet = Globals.Instance.universe.gameDefn.cardDefnSet;
		var cardSizeInPixels = cardDefnSet.cardSizeInPixels;

		this.graphics.strokeStyle = "LightGray";
		this.graphics.strokeRect
		(
			drawPos.x, drawPos.y,
			cardSizeInPixels.x, cardSizeInPixels.y
		);

		this.graphics.beginPath();
		this.graphics.moveTo(drawPos.x, drawPos.y);
		this.graphics.lineTo
		(
			drawPos.x + cardSizeInPixels.x,
			drawPos.y + cardSizeInPixels.y
		);
		this.graphics.stroke();

		for (var i = 0; i < cards.length; i++)
		{
			var card = cards[i];

			this.drawCardAtPos(card, drawPos);

			drawPos.add(cardStackDefn.spacing);
		}
	}

	drawCursor(cursor)
	{
		if (cursor.cardStackSelected() != null)
		{
			if (cursor.cardStackBeingMoved == null)
			{
				var numberOfCardsSelected = cursor.numberOfCardsSelected;

				var cardStackToHighlight = cursor.cardStackSelected().topCardsAsCardStack
				(
					numberOfCardsSelected
				);
				this.drawHighlightForCardStack(cardStackToHighlight);
			}
			else
			{
				this.drawCursor_2(cursor);
			}
		}
	}

	drawHighlightForCardStack(cardStackToHighlight)
	{
		var highlightPos = cardStackToHighlight.pos.clone();
		var highlightSize = cardStackToHighlight.size();
		var numberOfCardsToHighlight = cardStackToHighlight.cards.length;

		if (numberOfCardsToHighlight == 0)
		{
			this.graphics.strokeStyle = "DarkGray";
		}
		else
		{
			this.graphics.strokeStyle = "Black";
			this.graphics.fillStyle = "Black";
			this.graphics.fillText
			(
				numberOfCardsToHighlight,
				highlightPos.x,
				highlightPos.y + highlightSize.y
			);
		}

		this.graphics.strokeRect
		(
			highlightPos.x, highlightPos.y,
			highlightSize.x, highlightSize.y
		);
	}

	drawCursor_2(cursor)
	{
		var cardStackSelected = cursor.cardStackSelected();
		var cardStackSelectedPos = cardStackSelected.pos;
		var cardStackSelectedSpacing = cardStackSelected.defn().spacing.clone();
		var cardStackBeingMoved = cursor.cardStackBeingMoved;

		var cardSizeInPixels = cardStackSelected.defn().cardDefnSet().cardSizeInPixels;
		var offset = cardSizeInPixels.clone().multiplyScalar(.25);

		cardStackBeingMoved.pos = cardStackSelectedPos.clone().add
		(
			cardStackSelectedSpacing.multiplyScalar
			(
				cardStackSelected.cards.length
			)
		).add
		(
			offset
		)

		this.drawCardStack(cardStackBeingMoved);
	}

	drawLayout(layout)
	{
		var cardStacks = layout.cardStacks;

		for (var i = 0; i < cardStacks.length; i++)
		{
			var cardStack = cardStacks[i];
			this.drawCardStack(cardStack);
		}
	}

	drawSession(session)
	{
		this.clear();
		this.drawLayout(session.layout);
		this.drawCursor(session.cursor);
	}

	initialize(viewSizeInPixels)
	{
		this.viewSizeInPixels = viewSizeInPixels;

		var canvas = document.createElement("canvas");
		canvas.width = this.viewSizeInPixels.x;
		canvas.height = this.viewSizeInPixels.y;

		var divMain = document.getElementById("divMain");
		divMain.appendChild(canvas);

		this.graphics = canvas.getContext("2d");
	}
}
