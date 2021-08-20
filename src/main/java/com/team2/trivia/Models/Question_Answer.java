package com.team2.trivia.Models;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Question_Answer implements Serializable{

    public int questionId;

    @Id
    public int answerId;

    //@Column(name = "Is_Correct")
    public boolean isCorrect;
    
    //Constructor
    public Question_Answer(){

    }
    
    //Getter and Setter for varible questionId
    public int getQuestionId(){
        return questionId;
    }
    public void setQuestionId(int questionId){
        this.questionId  = questionId;
    }
    
    //Getter and Setter for varible answerId
    public int getAnswerId(){
        return answerId;
    }
    public void setAnswerId(int answerId){
        this.answerId  = answerId;
    }
    
    //Getter and Setter for varible isCorrect
    public boolean getIsCorrect(){
        return isCorrect;
    }
    
    public void setIsCorrect(boolean isCorrect){
        this.isCorrect  = isCorrect;
    }
}
