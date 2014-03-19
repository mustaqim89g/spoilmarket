/**
 * 
 */


function takeRandom(arr, count)
{
	var newArr = [];
	var takeArr = [];
	
	for (var i = 0; i < arr.length; i++)
	{
		newArr.push(arr[i]);
	}
	
	var numberToTake = (count < newArr.length ? count : newArr.length);
	for (var i = 0; i < numberToTake; i++)
	{
		var takeIndex = Math.floor(Math.random() * newArr.length);
		takeArr.push(newArr[takeIndex]);
		redim(newArr, takeIndex);
	}
	
	return takeArr;
}

function redim(arr, ignoreIndex)
{
	var newArr = [];
	for (var i = 0; i < newArr.length; i++)
	{
		if (i != ignoreIndex)
		{
			newArr.push(arr[i]);
		}
	}
	
	return newArr;
}

function clone(obj)
{
	return JSON.parse(JSON.stringify(obj));
}

