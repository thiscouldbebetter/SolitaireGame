
function NumberHelper()
{}
{
	NumberHelper.wrapNumberToRangeMax = function(numberToWrap, max)
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
