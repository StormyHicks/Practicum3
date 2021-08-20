package com.team2.trivia.Models;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Answer implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int answerId;
    public String answerText = "";

    //Constructor
    public Answer(){

    }

    //Getter and Setter for varible answerId
    public int getAnswerId(){
        return answerId;
    }
    public void setAnswerId(int answerId){
        this.answerId  = answerId;
    }

    //Getter and Setter for varible answerText
    public String getAnswerText(){
        return answerText;
    }
    public void setAnswerText(String answerText){
        this.answerText  = answerText;
    }

}
