/*Skladanie sie na prezenty
JavaScript logic core
Usage: Math.abs, Math.round
Objects [prototypes, constructors], Arrays with length and push()

This version uses ECMAScript 6 features
*/

//Person
class Person
{
	constructor(name, how_much_paid = 0) {
		this.name = name;
		this.how_much_paid = how_much_paid;
		
		if(Person.lastid == undefined)Person.lastid = 0;
		else Person.lastid++;
		
		this.id = Person.lastid;
	}
	
	Show()
	{
		if(this.how_much_paid > 0)
			return this.name + ",		" + this.how_much_paid + " zl";
		else
			return this.name;
	}
}

//DebtPerson
class DebtPerson
{
	constructor(person, how_much) {
		this.person = person;
		this.how_much = how_much;
	}
	
	Zero() {
		this.how_much = 0;
	}
	
	Substract(n) {
		this.how_much -= n;
	}
}

function UpdateID(list)
{
	for(i = 0; i < list.length; i++)list[i].id = i;
	Person.lastid = i;	//dont use let in for, or this will not work
}
function FindPerson(list, id)
{
	for(let i = 0; i < list.length; i++)
	{
		if(list[i]===undefined)continue;
		if(list[i].id == id)return list[i];
	}
	
	return null;
}


/*delegates = {
	giveDelegate:		function(name, amount)		->string,
	receiveDelegate:	function(name, amount)		->string,
	tradeDelegate:		function(from, to, amount)	->string
} */
function Calculate(ppl, delegates =  {})
{
	//struktura wartosci zwracanej
	var ret = {
		PersonCount: 0,		//ilosc osob
		Sum: 0,				//suma hajsu
		SumPerOs: 0,		//ile przypada na osobe
		ResultText: "",		//tekst wynikowy
	};
	
	//ilosc osob
	ret.PersonCount = ppl.length;
	
	
	//suma hajsu
	for(let i = 0; i < ppl.length; i++)
	{
		if(ppl[i]===undefined)continue;
		
		ret.Sum += ppl[i].how_much_paid;
	}
	
	//hajs na osobe
	ret.SumPerOs = ret.Sum / ret.PersonCount;
	
	var debtors		= [];	//dluznicy
	var creditors	= [];	//wierzyciele
	
	//dzielimy ludzi na dluznikow/wierzycieli
	for(let i = 0; i < ppl.length; i++)
	{
		if(ppl[i]===undefined)continue;
		
		var diff = ppl[i].how_much_paid - ret.SumPerOs;
		
		if(diff > 0)
		{
			creditors.push(new DebtPerson(ppl[i], diff));
			
			if(delegates.receiveDelegate != null)
				ret.ResultText += delegates.receiveDelegate(ppl[i].name, diff);
			else
				ret.ResultText += ppl[i].name + " +++ = " + Math.round(diff*100)/100 + " zl\r\n";
		}
		else if(diff < 0)
		{
			debtors.push(new DebtPerson(ppl[i], Math.abs(diff)));
			
			if(delegates.giveDelegate != null)
				ret.ResultText += delegates.giveDelegate(ppl[i].name, Math.abs(diff));
			else
				ret.ResultText += ppl[i].name + " --- = " + Math.abs(Math.round(diff*100)/100) + " zl\r\n";
		}
	}
	
	ret.ResultText += "\r\n";
	
	//dzielenie dlugu
	for(let c = 0; c < creditors.length; c++)
	{
		if(creditors[c].how_much <= 0) continue;
		
		for(let d = 0; d < debtors.length; d++)
		{
			if(debtors[d].how_much <= 0) continue;
			
			//dluznik pokrywa w calosci dlug wierzyciela
			if(debtors[d].how_much >= creditors[c].how_much)
			{
				if(delegates.tradeDelegate!= null)
					ret.ResultText += delegates.tradeDelegate(debtors[d].person.name, creditors[c].person.name, creditors[c].how_much);
				else
					ret.ResultText += debtors[d].person.name + " -> " + creditors[c].person.name + " = " + creditors[c].how_much.toFixed(2) + " zl\r\n";
				
				debtors[d].Substract(creditors[c].how_much);
				creditors[c].Zero();
				
				break;	//wierzyciel ma calosc, lecimy do nastepnego, przerywa petle dluznikow
			}
			else //pokrywa tylko czesciowo
			{
				if(delegates.tradeDelegate!= null)
					ret.ResultText += delegates.tradeDelegate(debtors[d].person.name, creditors[c].person.name, debtors[d].how_much);
				else
					ret.ResultText += debtors[d].person.name + " -> " + creditors[c].person.name + " = " + debtors[d].how_much.toFixed(2) + " zl\r\n";
				
				creditors[c].Substract(debtors[d].how_much);
				debtors[d].Zero();		
			}
			
		}
	}
	
	ret.SumPerOs = ret.SumPerOs.toFixed(2);
	
	return ret;
}


var LoadExampleData = function()
{
	return [
		new Person("Bartek", 120),
        new Person("Jadzia", 62),
        new Person("Magda", 36),
        new Person("Anka"),
        new Person("Karolina"),
        new Person("Kasia"),
        new Person("Kondzio"),
        new Person("Mati"),
        new Person("Michal"),
	];
}

var delegateHandlers = {
	giveDelegate:		(name, amount) => {
		return name + " ma dac ogolnie " + amount.toFixed(2) + " zl\r\n";
	},
	receiveDelegate:	(name, amount) => {
		return name + " ma dostac ogolnie " + amount.toFixed(2) + " zl\r\n";
	},
	tradeDelegate:		(from, to, amount) => {
		return from + " ma odddac " + amount.toFixed(2) + " zl dla " + to + "\r\n";
	},
};

//Node.js console debug part
function PrintDebugConsole()
{
	var arr = LoadExampleData();	//array of people
	var res = Calculate(arr, delegateHandlers);		//calculate all

	//print statistics
	console.log("L. os: " + res.PersonCount						//liczba osob skladajacych sie
				+ "\r\nSuma: " + res.Sum 						//suma wszystkich hajsow za prezent
				+ "\r\nZl/Os: " + res.SumPerOs + "\r\n");		//ile przypada na osobe


	console.log(res.ResultText);	//print result of calculations
}

module.exports = {
	
};

PrintDebugConsole();