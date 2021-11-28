
class GameDefn
{
	name: string;
	cardDefnSet: CardDefnSet;
	cardStackDefns: CardStackDefn[];
	actions: Action[];
	layoutBuild: () => Layout;

	cardStackDefnsByName: Map<string, CardStackDefn>;
	actionsByKeyCode: Map<string, Action>;

	constructor
	(
		name: string,
		cardDefnSet: CardDefnSet,
		cardStackDefns: CardStackDefn[],
		actions: Action[],
		layoutBuild: () => Layout
	)
	{
		this.name = name;
		this.cardDefnSet = cardDefnSet;
		this.cardStackDefns = cardStackDefns;
		this.actions = actions;
		this.layoutBuild = layoutBuild;

		this.cardStackDefnsByName =
			new Map(this.cardStackDefns.map(x => [x.name, x] ) );
		this.actionsByKeyCode =
			new Map(this.actions.map(x => [x.keyCode, x] ) );
	}

	static solitaire(): GameDefn
	{
		var cardDefnSetStandard = CardDefnSet.standard();

		var cardSizeInPixels = cardDefnSetStandard.cardSizeInPixels;

		var cardStackDefns =
		[
			new CardStackDefn
			(
				"Foundation",
				0, // cardsSelectableMax
				false, // areFaceDownCardsSelectable
				true, // showTopCardAfterMove
				new Coords(0, -.4), // spacingBetweenCards
				// dropCardStackFromCursorOnto
				(cursor: Cursor, cardStackAccepting: CardStack) =>
				{
					var canDrop = false;

					var cardStackToAccept = cursor.cardStackBeingMoved;
					var cardToAccept = cardStackToAccept.cards[0];
					var cardToAcceptDefn = cardToAccept.defn();

					var rankCodeOfCardToAccept = cardToAcceptDefn.name.substr(1);
					var rankValueOfCardToAccept =
						Rank.byCode(rankCodeOfCardToAccept).value;

					if (cardStackToAccept.cards.length > 1)
					{
						// canDrop = false;
					}
					else if (cardStackAccepting.cards.length == 0)
					{
						if (rankValueOfCardToAccept == 0)
						{
							canDrop = true;
						}
					}
					else
					{
						var cardToAcceptSuitCode = cardToAcceptDefn.name.substr(0, 1);

						var cardAccepting = cardStackAccepting.topCard();
						var cardAcceptingDefn = cardAccepting.defn();
						var cardAcceptingSuitCode = cardAcceptingDefn.name.substr(0, 1);

						var doSuitsMatch =
							(cardToAcceptSuitCode == cardAcceptingSuitCode); 

						var rankCodeOfCardAccepting =
							cardAcceptingDefn.name.substr(1);
						var rankValueOfCardAccepting =
							Rank.byCode(rankCodeOfCardAccepting).value;

						var rankOfCardAcceptingMinusAccepted =
							rankValueOfCardAccepting
							- rankValueOfCardToAccept;

						var isRankOfCardAcceptingOneLessThanAccepted =
							(rankOfCardAcceptingMinusAccepted == -1);

						canDrop =
						(
							doSuitsMatch
							&& isRankOfCardAcceptingOneLessThanAccepted
						);
					}

					if (canDrop == true)
					{
						cursor.dropCardStackBeingMovedOntoOther
						(
							cardStackAccepting
						);

						var layout = Globals.Instance.universe.session.layout;
						var numberOfFoundations = 4;

						var areAllFoundationsFullSoFar = true;

						for (var i = 0; i < numberOfFoundations; i++)
						{
							var foundationName = "Foundation" + i;
							var foundation = layout.cardStackByName(foundationName);
							if (foundation.cards.length < Rank.Instances()._All.length)
							{
								areAllFoundationsFullSoFar = false;
								break;
							}
						}

						if (areAllFoundationsFullSoFar == true)
						{
							alert("You win!");
						}
					}
				}
			),

			new CardStackDefn
			(
				"Stock",
				1, // cardsSelectableMax
				true, // areFaceDownCardsSelectable
				false, // showTopCardAfterMove
				// spacingBetweenCards
				new Coords(0, -.4),
				// dropCardStackFromCursorOnto
				function(cursor, cardStackAccepting)
				{
					if (cardStackAccepting.cards.length == 0)
					{
						var universe = Globals.Instance.universe;
						var layout = universe.session.layout;
						var cardStackWaste = layout.cardStackByName("Waste");
						cardStackWaste.flip().reverse();
						cardStackAccepting.add(cardStackWaste);
						cardStackWaste.cards.length = 0;
					}
				}
			),

			new CardStackDefn
			(
				"Tableau",
				null, // cardsSelectableMax
				false, // areFaceDownCardsSelectable
				true, // showTopCardAfterMove
				// spacingBetweenCards
				new Coords(0, cardSizeInPixels.y / 3),
				// dropCardStackFromCursorOnto
				function(cursor, cardStackAccepting)
				{
					var canDrop = false;

					if (cardStackAccepting.cards.length == 0)
					{
						canDrop = true;
					}
					else
					{
						var cardStackToAccept = cursor.cardStackBeingMoved;
						var cardToAccept = cardStackToAccept.cards[0];
						var cardToAcceptDefn = cardToAccept.defn();
						var cardToAcceptColor = cardToAcceptDefn.color;

						var cardAccepting = cardStackAccepting.topCard();
						var cardAcceptingDefn = cardAccepting.defn();
						var cardAcceptingColor = cardAcceptingDefn.color;

						var areColorsDifferent =
							(cardToAcceptColor != cardAcceptingColor);

						var rankCodeOfCardAccepting =
							cardAcceptingDefn.name.substr(1);
						var rankValueOfCardAccepting =
							Rank.byCode(rankCodeOfCardAccepting).value;

						var rankCodeOfCardToAccept =
							cardToAcceptDefn.name.substr(1);
						var rankValueOfCardToAccept =
							Rank.byCode(rankCodeOfCardToAccept).value;

						var rankOfCardAcceptingMinusAccepted =
							rankValueOfCardAccepting
							- rankValueOfCardToAccept;

						var isRankOfCardAcceptingOneGreaterThanAccepted =
							(rankOfCardAcceptingMinusAccepted == 1);

						canDrop =
						(
							areColorsDifferent
							&& isRankOfCardAcceptingOneGreaterThanAccepted
						);
					}

					if (canDrop == true)
					{
						cursor.dropCardStackBeingMovedOntoOther
						(
							cardStackAccepting
						);
					}
				}
			),

			new CardStackDefn
			(
				"Waste",
				1, // cardsSelectableMax
				false, // areFaceDownCardsSelectable
				true, // showTopCardAfterMove
				// spacingBetweenCards
				new Coords(0, -.4),
				// dropCardStackFromCursorOnto
				function(cursor, cardStackAccepting)
				{
					// The waste stack can only accept cards from the stock.
					var canDrop = (cursor.cardStackBeingMovedFrom.defnName == "Stock");
					if (canDrop == true)
					{
						cursor.dropCardStackBeingMovedOntoOther
						(
							cardStackAccepting
						);
					}
				}
			),
		];

		var cardStackDefnsByName =
			new Map(cardStackDefns.map(x => [x.name, x] ) );

		var actions =
		[
			new Action
			(
				"TakeOrDrop",
				"Enter", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectedTakeOrDrop();
				}
			),
			new Action
			(
				"Cancel",
				"Escape", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectedDeselect();
				}
			),
			new Action
			(
				"CountIncrement",
				"ArrowUp", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectionCountAdd(1);
				}
			),
			new Action
			(
				"CountDecrement",
				"ArrowDown", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectionCountAdd(-1);
				}
			),
			new Action
			(
				"MoveLeft",
				"a", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectNextInDirection
					(
						session.layout, new Coords(-1, 0)
					);
				}
			),
			new Action
			(
				"MoveRight",
				"d", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectNextInDirection
					(
						session.layout, new Coords(1, 0)
					);
				}
			),
			new Action
			(
				"MoveDown",
				"s", // keyCode,
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectNextInDirection
					(
						session.layout, new Coords(0, 1)
					);
				}
			),
			new Action
			(
				"MoveUp",
				"w", // keyCode
				// performForSession
				(session: Session) => 
				{
					session.cursor.cardStackSelectNextInDirection
					(
						session.layout, new Coords(0, -1)
					);
				}
			),
		];

		var layoutBuild = () =>
		{
			var deck = CardStack.fromCardDefns
			(
				null, // name
				null, // defnName
				null, // pos
				cardDefnSetStandard.cardDefns
			).shuffle();

			var cardStacks = [];

			var numberOfTableaus = 7;
			var tableauPos = new Coords
			(
				cardSizeInPixels.x,
				cardSizeInPixels.y * 2
			);
			var spacingBetweenTableaus = new Coords
			(
				cardSizeInPixels.x * 1.5,
				0
			);

			for (var t = 0; t < numberOfTableaus; t++)
			{
				var cardsInTableau = numberOfTableaus - t;

				var cardStackTableau = new CardStack
				(
					"Tableau" + t,
					cardStackDefnsByName.get("Tableau").name,
					tableauPos.clone(),
					deck.drawCardsFaceDown(cardsInTableau)
				);

				cardStackTableau.showTopCard();

				cardStacks.push(cardStackTableau);

				tableauPos.add(spacingBetweenTableaus);
			}

			var numberOfSuits = 4;
			var numberOfFoundations = numberOfSuits;
			var foundationPos = new Coords
			(
				cardSizeInPixels.x,
				cardSizeInPixels.y / 2
			);
			var spacingBetweenFoundations = new Coords
			(
				cardSizeInPixels.x * 1.5,
				0
			);

			for (var s = 0; s < numberOfFoundations; s++)
			{
				var cardStackFoundation = new CardStack
				(
					"Foundation" + s,
					cardStackDefnsByName.get("Foundation").name,
					foundationPos.clone(),
					[] // cards
				);

				cardStacks.push(cardStackFoundation);

				foundationPos.add(spacingBetweenFoundations);
			}

			var stockPos = foundationPos.clone().add
			(
				spacingBetweenFoundations
			);

			var cardStackStock = new CardStack
			(
				"Stock",
				cardStackDefnsByName.get("Stock").name,
				stockPos,
				deck.cards
			);

			cardStacks.push(cardStackStock);

			var wastePos = stockPos.clone().add
			(
				spacingBetweenFoundations
			);

			var cardStackWaste = new CardStack
			(
				"Waste",
				cardStackDefnsByName.get("Waste").name,
				wastePos,
				[] // cards
			);

			cardStacks.push(cardStackWaste);

			var layout = new Layout
			(
				cardStacks
			);

			return layout;
		}

		var returnValue = new GameDefn
		(
			"Solitaire",
			cardDefnSetStandard,
			cardStackDefns,
			actions,
			layoutBuild
		);

		return returnValue;
	}
}
