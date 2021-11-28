
class InputHelper
{
	keyCodePressed: string;

	clear(): void
	{
		this.keyCodePressed = null;
	}

	initialize(): void
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(event: KeyboardEvent): void
	{
		this.keyCodePressed = event.key;

		Globals.Instance.update();
	}
}
