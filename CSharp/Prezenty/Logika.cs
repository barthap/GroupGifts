using System;
using System.Collections.Generic;
using System.Windows.Forms;

namespace Prezenty
{
    public class Controller
    {
        public static List<Person> LoadExampleData()
        {
            return new List<Person>()
            {
                new Person("Bartek", 120),
                new Person("Jadzia", 62),
                new Person("Magda", 36),
                new Person("Anka"),
                new Person("Karolina"),
                new Person("Kasia"),
                new Person("Kondzio"),
                new Person("Mati"),
                new Person("Michał"),
            };
        }

        public int PersonCount;
        public double Sum;
        public double SumPerOs;
        public string ResultText;

        public delegate string GeneralGiveDelegate(string name, double diff);
        public delegate string GeneralReceiveDelegate(string name, double diff);
        public delegate string TradeDelegate(string from, string to, double amount);

        public GeneralGiveDelegate giveDelegate = null;
        public GeneralReceiveDelegate receiveDelegate = null;
        public TradeDelegate tradeDelegate = null;

        public void Calculate(ListBox.ObjectCollection obj_list)
        {
            PersonCount = obj_list.Count;

            Sum = 0;
            ResultText = "";

            foreach (Person os in obj_list)
            {
                Sum += os.HowMuchPaid;
            }

            
            SumPerOs = (double)Sum / (double)obj_list.Count;

            List<DebtPerson> debtors = new List<DebtPerson>();
            List<DebtPerson> creditors = new List<DebtPerson>();
            
            foreach (Person os in obj_list)
            {
                double diff = os.HowMuchPaid - SumPerOs;
                if (diff > 0)
                {
                    creditors.Add(new DebtPerson(os, diff));

                    //uzyj delegatu
                    if (receiveDelegate != null)
                        ResultText += receiveDelegate(os.name, diff);
                    else
                        ResultText += (os.name + " +++ = " + Math.Round(diff,2) + " zł\r\n");
                }
                else if (diff < 0)
                {
                    debtors.Add(new DebtPerson(os, Math.Abs(diff)));

                    if (giveDelegate != null)
                        ResultText += giveDelegate(os.name, Math.Abs(diff));
                    else //jeśli nie ma delegatu to domyslny tekst
                        ResultText +=  (os.name + " --- = " + Math.Abs(Math.Round(diff,2)) + " zł\r\n");
                }
            }
            ResultText += ("\r\n");
            foreach (DebtPerson c in creditors)
            {
                if (c.how_much <= 0) continue;
                //for(int i = 0; i < dluznicy.Count; i++)
                foreach (DebtPerson d in debtors)
                {
                    if (d.how_much <= 0) continue;

                    if (d.how_much >= c.how_much) //dluznik pokrywa w calosci dlug wierzyciela
                    {

                        if (tradeDelegate != null)
                            ResultText += tradeDelegate(d.person.name, c.person.name, c.how_much);
                        else
                            ResultText +=  (d.person.name + "-> " + c.person.name + " = " + Math.Round(c.how_much, 2) + " zł\r\n");


                        d.Substract(c.how_much);
                        c.Zero();

                        break;
                    }
                    else //pokrywa tylko czesciowo
                    {
                        if (tradeDelegate != null)
                            ResultText += tradeDelegate(d.person.name, c.person.name, d.how_much);
                        else
                            ResultText += (d.person.name + "-> " + c.person.name + " = " + Math.Round(d.how_much, 2) + " zł\r\n");


                        c.Substract(d.how_much);
                        d.Zero();
                    }
                }
            }
        }

    }

    public class Person
    {
       public string name;
        public bool czyKupila;
        private double ileZaplacila;
        public double HowMuchPaid
        {
            get { return ileZaplacila; }
            set { if (value > 0) czyKupila = true; else czyKupila = false; ileZaplacila = value; }
            
        }
        public string ShowValue
        {
            get
            {
                if (czyKupila) return name + ",\t\t\t" + HowMuchPaid.ToString()+ " zł";
                else return name;
            }
        }

        public Person(string imie, double ile = 0)
        {
            this.name = imie;
            this.HowMuchPaid = ile;
        }
    }

    public class DebtPerson
    {
      public  Person person;
      public   double how_much;
       public DebtPerson(Person o, double ile)
        {
            person = o;
            this.how_much = ile;
        }
        public void Substract(double n) { how_much -= n; }
        public void Zero() { how_much = 0; }
    }
}
