package com.hapex.prezenty.logic;

import java.util.ArrayList;

/**
 * Created by Barthap on 18.03.2017.
 */
public class Person {
    public String name;
    public float howMuchPaid;

    private ArrayList<Product> ownedProducts;

    public Person(String name, float howMuchPaid)
    {
        this.name = name;
        this.howMuchPaid = howMuchPaid;

        this.ownedProducts = new ArrayList<>();
    }
    public Person(String name)
    {
        this.name = name;
        this.howMuchPaid = 0;

        this.ownedProducts = new ArrayList<>();
    }

    public void addOwnedProduct(Product p)
    {
        p.setOwner(this);
        ownedProducts.add(p);
    }
}
