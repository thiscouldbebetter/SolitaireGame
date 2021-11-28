
class Action
{
	name: string;
	keyCode: string;
	performForSession: any;

	constructor(name: string, keyCode: string, performForSession: any)
	{
		this.name = name;
		this.keyCode = keyCode;
		this.performForSession = performForSession;
	}
}
