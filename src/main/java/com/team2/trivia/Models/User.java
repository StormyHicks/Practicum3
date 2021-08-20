package com.team2.trivia.Models;

import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class User implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int userId;
    public String userName = "";
    public String userPassword = "";
    public String userEmail= "";
    public boolean userAdmin = false;
    
    //Constructor
    public User(){

    }
    
    //Getter and Setter for varible userId
    public int getUserId(){
        return userId;
    }
    public void setUserId(int userId){
        this.userId  = userId;
    }
    
    //Getter and Setter for varible userName
    public String getUserName(){
        return userName;
    }
    public void setUserName(String userName){
        this.userName  = userName;
    }
    
    //Getter and Setter for varible userPassword
    public String getUserPassword(){
        return userPassword;
    }
    public void setUserPassword(String userPassword){
        this.userPassword  = userPassword;
    }
    
    //Getter and Setter for varible userEmail
    public String getUserEmail(){
        return userEmail;
    }
    public void setUserEmail(String userEmail){
        this.userEmail  = userEmail;
    }
    
    //Getter and Setter for varible userAdmin
    public boolean getUserAdmin(){
        return userAdmin;
    }
    public void setUserAdmin(boolean userAdmin){
        this.userAdmin  = userAdmin;
    }
}