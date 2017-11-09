/**
 * Created by Barthap on 13.03.2017.
 */

/** Skladanie sie na prezenty
 JavaScript logic core
 Usage: Math.abs, Math.round
 Objects [prototypes, constructors], Arrays with length and push()

 This version uses ECMAScript 6 features
 */


//Class representing one person in list
class Person
{
    constructor(name, how_much_paid = 0)
    {
        this.name = name;
        this.how_much_paid = how_much_paid;
    }

    Show()
    {
        if (this.how_much_paid > 0)
            return this.name + ",		" + this.how_much_paid + " zl";
        else
            return this.name;
    }
}

//DebtPerson - helper class for calculating debt
class DebtPerson {
    constructor(person, how_much) {
        this.person = person;
        this.how_much = how_much;
    }

    //clears debt
    Zero() {
        this.how_much = 0;
    }

    Substract(n) {
        this.how_much -= n;
    }
}

//object representing array of people
var People = {
    list: [],

    Add(person) {
        if (Array.isArray(person))
            this.list = this.list.concat(person);
        else
            this.list.push(person);

        this.Calculate();
    },
    //DEPRECATED, use Get(id) instead
    Find(id) {
        for (let i = 0; i < this.list.length; i++) {
            if (this.list[i] === undefined)continue;
            if (this.list[i].id == id)return this.list[i];
        }

        return null;
    },

    Get(id) {
        if(id < 0 || id >= this.list.length ) return null;
        return this.list[id];
    },
    Update(id, name, val = 0) {
        this.list[id].name = name;
        this.list[id].how_much_paid = val;
    },

    Delete(id) {
        this.list.splice(id, 1);
    },
    //Swaps peope with indices id1 and id2
    Swap(id1, id2) {
        let buf = this.list[id1];
        this.list[id1] = this.list[id2];
        this.list[id2] = buf;
    },
    //Calculate: {},       //out of class because it is really long
};

/* CALCULATES RESULT VALUES

@param delegates = {

 giveDelegate:		function(name, amount)		->string,
 receiveDelegate:	function(name, amount)		->string,
 tradeDelegate:		function(from, to, amount)	->string
 }

@return object {
   int  PersonCount,
   float Sum,
   float SumPerOs,
   string ResultText
   }
*/
People.Calculate = function (delegates = {}) {

    let ppl = this.list;    //just alias

    //return value struct
    let ret = {
        PersonCount: 0,		//count of people
        Sum: 0,				//total sum
        SumPerOs: 0,		//money per one person
        ResultText: "",		//result text
    };

    if(ppl.length == 0)return ret;

    //person count is just array length
    ret.PersonCount = ppl.length;


    //total sum of money
    ppl.forEach(p => ret.Sum += p.how_much_paid);

    //money per one person = total sum / people count
    ret.SumPerOs = ret.Sum / ret.PersonCount;

    let debtors = [];	//array of debtors
    let creditors = [];	//array of creditors

    //group people into debtors and creditors
    ppl.forEach(i => {
        let diff = i.how_much_paid - ret.SumPerOs;      //persons debt/credit

        //if debt is 0, do nothing

        if (diff > 0) {     //if greater than 0, person is creditor
            creditors.push(new DebtPerson(i, diff));

            //if delegate is defined, use delegate, else use default function
            if (delegates.receiveDelegate != null)
                ret.ResultText += delegates.receiveDelegate(i.name, diff);
            else
                ret.ResultText += i.name + " +++ = " + Math.round(diff * 100) / 100 + " zl\r\n";
        }
        else if (diff < 0) {    //if less than 0, person is debtor
            debtors.push(new DebtPerson(i, Math.abs(diff)));

            if (delegates.giveDelegate != null)
                ret.ResultText += delegates.giveDelegate(i.name, Math.abs(diff));
            else
                ret.ResultText += i.name + " --- = " + Math.abs(Math.round(diff * 100) / 100) + " zl\r\n";
        }
    });

    ret.ResultText += "<br>";

    //most tricky part, we find debtors for each creditor
    //cannot use forEach() because of continue;
    for (let c = 0; c < creditors.length; c++) {
        if (creditors[c].how_much <= 0) continue;   //if creditor is already done, go to next

        //find debtors for current creditor
        for (let d = 0; d < debtors.length; d++) {
            if (debtors[d].how_much <= 0) continue; //if debtor has no debt, leave him and find next one

            //debtor's debt fully covers creditor's credit
            //he pays amount of creditor's credit
            if (debtors[d].how_much >= creditors[c].how_much) {
                if (delegates.tradeDelegate != null)
                    ret.ResultText += delegates.tradeDelegate(debtors[d].person.name, creditors[c].person.name, creditors[c].how_much);
                else
                    ret.ResultText += debtors[d].person.name + " -> " + creditors[c].person.name + " = " + creditors[c].how_much.toFixed(2) + " zl\r\n";

                //debtor's debt is lowered by amount of creditor's credit
                debtors[d].Substract(creditors[c].how_much);
                creditors[c].Zero();    //credit fully paid

                break;	//creditor is done, go to the next one
                        //this breaks Debtors 'for' loop
            }
            else //when debtor's debt isn't enough to cover creditor's credit
            {    //he pays all of his debt

                if (delegates.tradeDelegate != null)
                    ret.ResultText += delegates.tradeDelegate(debtors[d].person.name, creditors[c].person.name, debtors[d].how_much);
                else
                    ret.ResultText += debtors[d].person.name + " -> " + creditors[c].person.name + " = " + debtors[d].how_much.toFixed(2) + " zl\r\n";

                //so creditor's has lowered his credit by amount of debtor's debt
                creditors[c].Substract(debtors[d].how_much);
                debtors[d].Zero();  //debt fully paid, done
                                    //lets look for another debtor to pay this credit
            }

        }
    }

    //round it to 2 digits after comma
    ret.SumPerOs = ret.SumPerOs.toFixed(2);

    return ret;
}

//some example array of people
const ExampleData = function () {
    return [
        new Person("Ania"),
        new Person("Bartek"),
        new Person("Celina", 36),
        new Person("Dorota"),
        new Person("Ewa", 120),
        new Person("Ferdynand", 62),
        new Person("Gabriela"),
        new Person("Henryk"),
        new Person("Ignacy"),
    ];
};

//Used only for debugging
//Prints calculation results in console
function PrintDebugConsole() {

    let delegateHandlers = {
        giveDelegate: (name, amount) => {
            return name + " ma dac ogolnie " + amount.toFixed(2) + " zl\r\n";
        },
        receiveDelegate: (name, amount) => {
            return name + " ma dostac ogolnie " + amount.toFixed(2) + " zl\r\n";
        },
        tradeDelegate: (from, to, amount) => {
            return from + " ma odddac " + amount.toFixed(2) + " zl dla " + to + "\r\n";
        },
    };

    let arr = ExampleData();	//array of people
    People.Add(arr);
    let res = People.Calculate(/*delegateHandlers*/);		//calculate all

    //print statistics
    console.log("L. os: " + res.PersonCount						//liczba osob skladajacych sie
        + "\r\nSuma: " + res.Sum 						//suma wszystkich hajsow za prezent
        + "\r\nZl/Os: " + res.SumPerOs + "\r\n");		//ile przypada na osobe


    console.log(res.ResultText);	//print result of calculations
};

/*
var module;
module.exports = {
    Person,
    People,
    PrintDebugConsole,
    ExampleData,
};*/