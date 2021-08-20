package com.team2.trivia.Models;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Score implements Serializable {
    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int scoreId;
    public int userId;
    public int categoryId;
    public int scoreNum;
    public int scoreTotal;

    //Constructor
    public Score(){
        
    }
    
    //Getter and Setter for varible scoreId
    public int getScoreId(){
        return scoreId;
    }
    public void setScoreId(int scoreId){
        this.scoreId  = scoreId;
    }
    
    //Getter and Setter for varible userId
    public int getUserId(){
        return userId;
    }
    public void setUserId(int userId){
        this.userId  = userId;
    }
    
    //Getter and Setter for varible categoryId
    public int getCategoryId(){
        return categoryId;
    }
    public void setCategoryId(int categoryId){
        this.categoryId  = categoryId;
    }
    
    //Getter and Setter for varible scoreNum
    public int getScoreNum(){
        return scoreNum;
    }
    public void setScoreNum(int scoreNum){
        this.scoreNum  = scoreNum;
    }
    
    //Getter and Setter for varible scoreTotal
    public int getScoreTotal(){
        return scoreTotal;
    }
    public void setScoreTotal(int scoreTotal){
        this.scoreTotal  = scoreTotal;
    }
}
