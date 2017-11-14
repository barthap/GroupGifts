package com.hapex.prezenty;

import com.hapex.prezenty.logic.*;

public class Main {

    public static void main(String[] args) {

        Person[] example = {
                new Person("Bartek", 120),
                new Person("Jadzia", 62),
                new Person("Magda", 36),
                new Person("Anka"),
                new Person("Karolina"),
                new Person("Kasia"),
                new Person("Kondzio"),
                new Person("Mati"),
                new Person("Michal"),
        };

        PersonManager mgr = new PersonManager();
        mgr.add(example);

        CalculationResult res = mgr.calculate();
        String resultText = res.generateLog();

        System.out.print(resultText);
    }
}
