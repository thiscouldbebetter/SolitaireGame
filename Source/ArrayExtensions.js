
// extensions

function ArrayExtensions()
{
	// do nothing
}

{
	Array.prototype.addLookups = function(keyName)
	{
		for (var i = 0; i < this.length; i++)
		{
			var item = this[i];
			var keyValue = item[keyName];
			this[keyValue] = item;
		}

		return this;
	}

	Array.prototype.append = function(other)
	{
		for (var i = 0; i < other.length; i++)
		{
			var item = other[i];
			this.push(item);
		}

		return this;
	}
}
