package com.hapex.prezenty.logic;

/**
 * Created by Barthap on 18.03.2017.
 */

class DebtPerson {
    private Person person;
    private float calculationDebt;
    private final float presentationDebt;

    public DebtPerson(Person person, float debt) {
        this.person = person;
        this.calculationDebt = debt;
        this.presentationDebt = debt;
    }

    public Person person()
    {
        return person;
    }
    public float getDebt()
    {
        return this.presentationDebt;
    }
    public float debt()
    {
        return this.calculationDebt;
    }

    public void zero()
    {
        this.calculationDebt = 0;
    }

    public void substract(float n)
    {
        this.calculationDebt -= n;
    }
}
