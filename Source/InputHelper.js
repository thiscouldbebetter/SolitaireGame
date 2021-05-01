
class InputHelper
{
	clear()
	{
		this.keyCodePressed = null;
	}

	initialize()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	handleEventKeyDown(event)
	{
		this.keyCodePressed = "_" + event.keyCode;

		Globals.Instance.update();
	}
}
