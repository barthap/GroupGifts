package com.hapex.prezenty.logic;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * Created by Barthap on 18.03.2017.
 */
public class PersonManager {
    private ArrayList<Person> people;

    public PersonManager()
    {
        people = new ArrayList<Person>();
    }

    public void add(Person p)
    {
        people.add(p);
    }
    public void add(Person[] arr)
    {
        people.addAll(Arrays.asList(arr));
    }
    public Person get(int id) throws IndexOutOfBoundsException
    {
        return people.get(id);
    }
    public void update(int id, Person newData) throws IndexOutOfBoundsException
    {
        people.set(id, newData);
    }
    public void delete(int id)
    {
        people.remove(id);
    }
    public void swap(int id1, int id2)
    {
        Person buf = this.people.get(id1);
        this.people.set(id1, this.people.get(id2));
        this.people.set(id2, buf);
    }

    public CalculationResult calculate()
    {
        CalculationResult res = new CalculationResult();
        Person[] ppl = this.people.toArray(new Person[this.people.size()]);

        res.count = ppl.length;

        for(Person p : ppl)
            res.sum+=p.howMuchPaid;

        res.sumPerOs = res.sum / res.count;

        for(Person i : ppl)
        {
            float diff = i.howMuchPaid - res.sumPerOs;

            if(diff > 0)
                res.creditors.add(new DebtPerson(i, diff));

            else if(diff < 0)
                res.debtors.add(new DebtPerson(i, Math.abs(diff)));

        }


        for(DebtPerson c : res.creditors)
        {
            if(c.debt() <= 0)continue;

            for(DebtPerson d : res.debtors)
            {
                if(d.debt() <= 0)continue;

                if(d.debt() >= c.debt())
                {
                    res.addTrade(d, c, c.debt());

                    d.substract(c.debt());
                    c.zero();

                    break;
                }
                else
                {
                    res.addTrade(d, c, d.debt());

                    c.substract(d.debt());
                    d.zero();
                }
            }
        }

        return res;
    }
}
