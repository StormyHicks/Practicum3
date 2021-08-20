package com.team2.trivia.Models;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Question implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    public int questionId;
    public String questionText = "";
    public int categoryId;

    //Constructor
    public Question(){

    }
    
    //Getter and Setter for varible questionId
    public int getQuestionId(){
        return questionId;
    }
    public void setQuestionId(int questionId){
        this.questionId  = questionId;
    }
    
    //Getter and Setter for varible questionText
    public String getQuestionText(){
        return questionText;
    }
    public void setQuestionText(String questionText){
        this.questionText  = questionText;
    }

    public int getcategoryId() {
        return categoryId;
    }
    public void setcategoryId(int categoryId) {
        this.categoryId = categoryId;
    }
}