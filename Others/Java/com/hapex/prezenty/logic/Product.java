package com.hapex.prezenty.logic;

/**
 * Created by Barthap on 18.03.2017.
 */
public class Product {

    private String name;
    private float price;
    private Person owner;

    public Product()
    {
        name = "";
        price = 0;
        owner = null;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }

    public Person getOwner() {
        return owner;
    }
    public void setOwner(Person owner) {
        this.owner = owner;
    }
}
