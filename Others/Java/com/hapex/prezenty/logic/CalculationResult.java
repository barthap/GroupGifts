package com.hapex.prezenty.logic;

import java.util.ArrayList;

/**
 * Created by Barthap on 18.03.2017.
 */
public class CalculationResult {

    int count;
    float sum;
    float sumPerOs;

    ArrayList<DebtPerson> debtors;
    ArrayList<DebtPerson> creditors;
    ArrayList<Trade> trades;

    CalculationResult() {
        count = 0;
        sum = 0;
        sumPerOs = 0;

        debtors = new ArrayList<>();
        creditors = new ArrayList<>();
        trades = new ArrayList<>();
    }

    public String generateLog()
    {
        StringBuilder sb = new StringBuilder();

        for(DebtPerson i : creditors)
            sb.append(i.person().name + " +++ = " + i.getDebt() + "zł\r\n");

        sb.append("\r\n");

        for(DebtPerson i : debtors)
            sb.append(i.person().name + " --- = " + i.getDebt() + "zł\r\n");

        sb.append("\r\n");

        for(Trade t : trades)
            sb.append(t.from.name + " -> " + t.to.name + " = " + t.amount + "zł\r\n");

        return sb.toString();
    }

    public int getCount() {
        return count;
    }
    public float getSum() {
        return sum;
    }
    public float getSumPerOs() {
        return sumPerOs;
    }

    void addTrade(DebtPerson from, DebtPerson to, float amount)
    {
        trades.add(new Trade(from.person(), to.person(), amount));
    }
    public class Trade
    {
        private Person from;
        private Person to;
        private float amount;

        Trade(Person from, Person to, float amount)
        {
            this.from = from;
            this.to = to;
            this.amount = amount;
        }

        public Person getFrom() {
            return this.from;
        }
        public Person getTo() {
            return this.to;
        }
        public float getAmount() {
            return this.amount;
        }
    }
}
