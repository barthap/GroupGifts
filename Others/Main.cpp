#include <iostream>
#include <string>
#include <sstream>
#include <vector>
#include <cmath>
using namespace std;

class Person
{
public:
	string name;
	double HowMuchPaid;
	string ShowValue()
	{
		if (HowMuchPaid > 0)
			return name + ",\t\t\t" + to_string(HowMuchPaid) + " zl";
		else return name;
	}

	Person(string imie = "", double ile = 0)
	{
		this->name = imie;
		this->HowMuchPaid = ile;
	}
};

class DebtPerson
{
public:
	Person person;
	double how_much;
	DebtPerson(Person o, double ile)
	{
		person = o;
		this->how_much = ile;
	}
	void Substract(double n) { how_much -= n; }
	void Zero() { how_much = 0; }
};

struct CalculateResult
{
	int PersonCount;
	double Sum;
	double SumPerOs;
	string ResultText;
};

struct DelegateHandlers
{
	string (*giveDelegate)(string, double);
	string (*receiveDelegate)(string, double);
	string (*tradeDelegate)(string, string, double);
};

CalculateResult Calculate(vector<Person> ppl, DelegateHandlers* dh = nullptr)
{
	CalculateResult res;
	
	res.PersonCount = ppl.size();
	res.Sum = 0;

	for (int i = 0; i < ppl.size(); i++)
		res.Sum += ppl[i].HowMuchPaid;

	res.SumPerOs = res.Sum / res.PersonCount;

	vector<DebtPerson> debtors;
	vector<DebtPerson> creditors;

	for (int i = 0; i < ppl.size(); i++)
	{
		Person &p = ppl[i];

		double diff = p.HowMuchPaid - res.SumPerOs;

		if (diff > 0)
		{
			creditors.push_back(DebtPerson(p, diff));

			if (dh != nullptr && dh->receiveDelegate != nullptr)
				res.ResultText += dh->receiveDelegate(p.name, diff);
			else
				res.ResultText += p.name + " +++ = " + to_string(round(diff * 100) / 100) + " zl\r\n";
		}
		else if (diff < 0)
		{
			debtors.push_back(DebtPerson(p, abs(diff)));

			if (dh != nullptr && dh->giveDelegate != nullptr)
				res.ResultText += dh->giveDelegate(p.name, abs(diff));
			else
				res.ResultText += p.name + " --- = " + to_string(abs(round(diff * 100) / 100)) + " zl\r\n";
		}
	}

	res.ResultText += "\r\n";

	for (int i = 0; i < creditors.size(); i++)
	{
		DebtPerson& c = creditors[i];

		if (c.how_much <= 0) continue;

		for (int j = 0; j < debtors.size(); j++)
		{
			DebtPerson& d = debtors[j];

			if (d.how_much <= 0) continue;

			if (d.how_much >= c.how_much)
			{
				if (dh != nullptr && dh->tradeDelegate != nullptr)
					res.ResultText += dh->tradeDelegate(d.person.name, c.person.name, c.how_much);
				else
					res.ResultText += d.person.name + " -> " + c.person.name + " = " + to_string(round(c.how_much*100)/100) + " zl\r\n";

				d.Substract(c.how_much);
				c.Zero();

				break;
			}
			else
			{
				if (dh != nullptr && dh->tradeDelegate != nullptr)
					res.ResultText += dh->tradeDelegate(d.person.name, c.person.name, d.how_much);
				else
					res.ResultText += d.person.name + " -> " + c.person.name + " = " + to_string(round(d.how_much * 100) / 100) + " zl\r\n";

				c.Substract(d.how_much);
				d.Zero();

			}
		}
	}

	return res;
}

vector<Person> LoadExampleData()
{
	vector<Person> v;
	v.push_back(Person("Bartek", 120));
	v.push_back(Person("Jadzia", 62));
	v.push_back(Person("Magda", 36));
	v.push_back(Person("Anka"));
	v.push_back(Person("Karolina"));
	v.push_back(Person("Kasia"));
	v.push_back(Person("Kondzio"));
	v.push_back(Person("Mati"));
	v.push_back(Person("Michal"));

	return v;
}


//przykladowe definicje delegatow
string receiveStr(string name, double a)     //osoba name otrzymuje a zl
{
	std::stringstream s;
	s.precision(2);
	s << fixed << a;
	return name + " ma dostac ogolnie " + s.str() + " zl\r\n";
}
string giveStr(string name, double a)        //osoba name oddaje a zl
{
	std::stringstream s;
	s.precision(2);
	s << fixed << a;
	return name + " ma dac ogolnie " + s.str() + " zl\r\n";
}
string tradeStr(string from, string to, double a)    //osoba from daje osobie to a zl
{
	std::stringstream s;
	s.precision(2);
	s << fixed << a;
	return from + " ma dac " + s.str() + " zl dla " + to + "\r\n";
}

int main()
{
	
	DelegateHandlers dh;
	dh.giveDelegate = &giveStr;
	dh.receiveDelegate = &receiveStr;
	dh.tradeDelegate = &tradeStr;

	vector<Person> people = LoadExampleData();
	CalculateResult res = Calculate(people, &dh);
	cout << "L os: " << res.PersonCount << "\r\nSuma: " << res.Sum << "\r\nZl/os: " << res.SumPerOs << "\r\n" << endl;
	cout << res.ResultText;

	system("pause");
}