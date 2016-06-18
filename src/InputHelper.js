
function InputHelper()
{
	// do nothing
}

{
	InputHelper.prototype.clear = function()
	{
		this.keyCodePressed = null;
	}

	InputHelper.prototype.initialize = function()
	{
		document.body.onkeydown = this.handleEventKeyDown.bind(this);
	}

	// events

	InputHelper.prototype.handleEventKeyDown = function(event)
	{
		this.keyCodePressed = "_" + event.keyCode;

		Globals.Instance.update();
	}
}
