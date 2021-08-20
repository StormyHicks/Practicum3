package com.team2.trivia.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="category")
public class Category implements Serializable{
    
    
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name="Category_Id")
    private int categoryId;
    
    @Column(name = "Category_Name")
    private String categoryName = "";
    private String categoryDescription = "";
    
    //Constructor
    public Category(){

    }
    
    //Constructor
    public Category(String categoryName, String categoryDescription){
        this.categoryName = categoryName;
        this.categoryDescription = categoryDescription;
    }

    //Getter and Setter for varible categoryId
    public int getCategoryId(){
        return categoryId;
    }
    public void setCategoryId(int categoryId){
        this.categoryId  = categoryId;
    }

    //Getter and Setter for varible categoryName
    public String getCategoryName(){
        return categoryName;
    }
    public void setCategoryName(String categoryName){
        this.categoryName  = categoryName;
    }

    //Getter and Setter for varible categoryDescription
    public String getCategoryDescription(){
        return categoryDescription;
    }
    public void setCategoryDescription(String categoryDescription){
        this.categoryDescription  = categoryDescription;
    }

}
