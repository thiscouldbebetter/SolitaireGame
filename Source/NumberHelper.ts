
class NumberHelper
{
	static wrapNumberToRangeMax(numberToWrap: number, max: number): number
	{
		while (numberToWrap < 0)
		{
			numberToWrap += max;
		}

		while (numberToWrap >= max)
		{
			numberToWrap -= max;
		}

		return numberToWrap;
	}
}
